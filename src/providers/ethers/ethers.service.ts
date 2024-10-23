import { Injectable, OnModuleInit } from '@nestjs/common';
import { Block, ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { BlockEntity } from '../../modules/block-chain/entities/block.entity';
import { TransactionReceiptEntity } from '../../modules/block-chain/entities/transactionReceipt.entity';
import { DataSource } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { LogEntity } from '../../modules/block-chain/entities/log.entity';

dotenv.config();

@Injectable()
export class EthersService implements OnModuleInit {
  private readonly network: string = process.env.ETHEREUM_NETWORK;
  private readonly infuraApiKey: string = process.env.INFURA_API_KEY;
  private provider = new ethers.InfuraProvider();

  constructor(private readonly dataSource: DataSource) {
    this.provider = new ethers.InfuraProvider(this.network, this.infuraApiKey);
  }

  onModuleInit() {
    this.getLatestData();
  }

  /**
   * 블록체인 데이터 Block, TransactionReceipt, Log 값을 저장합니다.
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
          await this.processBlock(
            block,
            blockEntities,
            transactionEntities,
            logEntities,
          );
        }
      }

      await this.saveAllEntities(
        queryRunner,
        blockEntities,
        transactionEntities,
        logEntities,
      );

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
   * 새로 생성되는 데이터를 저장합니다.
   * @param block
   */
  async saveLatestData(block: Block): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    // 트랜잭션 시작
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const blockEntities = [];
      const transactionEntities = [];
      const logEntities = [];

      if (block) {
        await this.processBlock(
          block,
          blockEntities,
          transactionEntities,
          logEntities,
        );
      }

      await this.saveAllEntities(
        queryRunner,
        blockEntities,
        transactionEntities,
        logEntities,
      );

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

  // 블록, 트랜잭션, 로그 엔티티 생성
  private async processBlock(
    block: Block,
    blockEntities: BlockEntity[],
    transactionEntities: TransactionReceiptEntity[],
    logEntities: LogEntity[],
  ): Promise<void> {
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

  // 엔티티 저장
  private async saveAllEntities(
    queryRunner: any,
    blockEntities: BlockEntity[],
    transactionEntities: TransactionReceiptEntity[],
    logEntities: LogEntity[],
  ): Promise<void> {
    if (blockEntities.length > 0) {
      await queryRunner.manager.save(BlockEntity, blockEntities);
    }

    if (transactionEntities.length > 0) {
      await queryRunner.manager.save(
        TransactionReceiptEntity,
        transactionEntities,
      );
    }

    if (logEntities.length > 0) {
      await queryRunner.manager.save(LogEntity, logEntities);
    }
  }

  /**
   * 가장 최근에 생성된 데이터를 가져옵니다.
   */
  getLatestData() {
    this.provider.on('block', async (blockNumber: number) => {
      try {
        const block = await this.provider.getBlock(blockNumber);
        if (block) {
          await this.saveLatestData(block);
        }
      } catch (error) {
        console.error('Error processing block:', error);
      }
    });
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
