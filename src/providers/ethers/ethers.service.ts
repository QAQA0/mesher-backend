import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { BlockEntity } from '../../modules/block-chain/entities/block.entity';
import { TransactionReceiptEntity } from '../../modules/block-chain/entities/transactionReceipt.entity';
import { DataSource } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { LogEntity } from '../../modules/block-chain/entities/log.entity';

dotenv.config();

@Injectable()
export class EthersService {
  private readonly network: string = process.env.ETHEREUM_NETWORK;
  private readonly infuraApiKey: string = process.env.INFURA_API_KEY;
  private provider = new ethers.InfuraProvider();

  constructor(private readonly dataSource: DataSource) {
    this.provider = new ethers.InfuraProvider(this.network, this.infuraApiKey);
  }

  /**
   * 블록체인 데이터 Block, TransactionReceipt, Log 값 저장
   * @Param blockCount (조회 개수)
   */
  async getDatas(blockCount: number): Promise<void> {
    if (blockCount == 0) {
      return;
    }
    const latestBlockNumber = await this.provider.getBlockNumber();
    const queryRunner = this.dataSource.createQueryRunner();

    // 트랜잭션 시작
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const blockEntities = [];
      const transactionEntities = [];
      const logEntities = [];

      for (let i = 0; i < blockCount; i++) {
        const block = await this.provider.getBlock(latestBlockNumber - i);

        if (block) {
          const blockEntity = BlockEntity.builder()
            .setHash(block.hash)
            .setParentHash(block.parentHash)
            .setNumber(block.number)
            .setTimestamp(block.timestamp)
            .setNonce(block.nonce)
            .setDifficulty(block.difficulty)
            .setGasLimit(block.gasLimit)
            .setGasUsed(block.gasUsed)
            .setMiner(block.miner)
            .setBaseFeePerGas(block.baseFeePerGas)
            .setTransactions(block.transactions as string[])
            .build();

          blockEntities.push(blockEntity);

          // 병렬 처리
          const transactionPromise = block.transactions.map(async (txHash) => {
            const receipt = await this.provider.getTransactionReceipt(txHash);

            const transactionEntity = TransactionReceiptEntity.builder()
              .setBlockHash(receipt.blockHash)
              .setBlockNumber(receipt.blockNumber)
              .setCumulativeGasUsed(receipt.cumulativeGasUsed)
              .setGasPrice(receipt.gasPrice)
              .setFrom(receipt.from)
              .setGasUsed(receipt.gasUsed)
              .setStatus(receipt.status)
              .setTo(receipt.to)
              .setTransactionHash(receipt.hash)
              .setTransactionIndex(receipt.index)
              .build();

            transactionEntities.push(transactionEntity);

            const logPromise = receipt.logs.map((transactionReceiptLog) => {
              const logEntity = LogEntity.builder()
                .setLogIndex(transactionReceiptLog.index)
                .setTransactionHash(transactionReceiptLog.transactionHash)
                .setBlockHash(transactionReceiptLog.blockHash)
                .setBlockNumber(transactionReceiptLog.blockNumber)
                .setAddress(transactionReceiptLog.address)
                .setTopics(transactionReceiptLog.topics as string[])
                .setData(transactionReceiptLog.data)
                .build();

              logEntities.push(logEntity);
            });

            await Promise.all(logPromise);
          });

          await Promise.all(transactionPromise);
        }
      }

      // 블록 저장
      if (blockEntities.length > 0) {
        await queryRunner.manager.save(BlockEntity, blockEntities);
      }

      // 트랜잭션 저장
      if (transactionEntities.length > 0) {
        await queryRunner.manager.save(
          TransactionReceiptEntity,
          transactionEntities,
        );
      }

      // 로그 저장
      if (logEntities.length > 0) {
        await queryRunner.manager.save(LogEntity, logEntities);
      }

      // 작업 완료 시 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 트랜잭션 종료
      await queryRunner.release();
    }
  }

  /**
   * 12초마다 가장 최근에 생성된 데이터를 저장합니다.
   */
  @Cron('*/12 * * * * *')
  async getLatestData() {
    await this.getDatas(1);
  }

  /**
   * 가장 최근에 생성된 블록 데이터 하나를 가져옵니다.
   * (테스트용 메서드)
   */
  async getBlock() {
    return await this.provider.getBlock('latest');
  }

  async getTransactionReceipt(hash: string) {
    return await this.provider.getTransactionReceipt(hash);
  }
}
