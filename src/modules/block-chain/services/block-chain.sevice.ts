import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { BlockEntityRepository } from '../repository/block-entity.repository';
import { TransactionReceiptEntityRepository } from '../repository/transaction-receipt-entity.repository';
import { Cron } from '@nestjs/schedule';
import { SlackService } from '../../../providers/slack/slack.service';
import { LogEntityRepository } from '../repository/log-entity.repository';
import { BlockWithTransactionReceiptAndLogDto } from '../dtos/block-with-transaction-receipt-and-log.dto';
import { TransactionReceiptWithLogDto } from '../dtos/transaction-receipt-with-log.dto';

dotenv.config();

@Injectable()
export class BlockChainService {
  constructor(
    private readonly slackService: SlackService,
    private readonly blockRepository: BlockEntityRepository,
    private readonly transactionReceiptRepository: TransactionReceiptEntityRepository,
    private readonly logRepository: LogEntityRepository,
  ) {}

  /**
   * BlockHash 값을 기준으로 Block과 내부의 TransactionReceipt, Log를 조회합니다.
   * @param blockHash
   * @returns Promise<BlockWithTransactionReceiptDto>
   */
  async findBlock(
    blockHash: string,
  ): Promise<BlockWithTransactionReceiptAndLogDto> {
    try {
      console.log(blockHash);

      //Block 조회
      const block = await this.blockRepository.findBlockByHash(blockHash);
      //Block의 TransactionReceipts 조회
      const transactionReceipts =
        await this.transactionReceiptRepository.findAllByBlockHash(blockHash);
      //TransactionReceipt의 Logs 조회
      const logs = await this.logRepository.findAllLogByBlockHash(blockHash);

      return new BlockWithTransactionReceiptAndLogDto(
        block,
        transactionReceipts,
        logs,
      );
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * TransactionHash 값을 기준으로 TransactionReceipt, Log를 조회합니다.
   * @param transactionHash
   * @returns Promise<TransactionReceiptWithLogDto>
   */
  async findTransactionReceipt(
    transactionHash: string,
  ): Promise<TransactionReceiptWithLogDto> {
    try {
      console.log(transactionHash);

      //TransactionReceipts 조회
      const transactionReceipt =
        await this.transactionReceiptRepository.findOne(transactionHash);
      //Log 조회
      const logs =
        await this.logRepository.findAllByTransactionHash(transactionHash);

      return new TransactionReceiptWithLogDto(transactionReceipt, logs);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 5분마다 블록과 트랜잭션 영수증, 로그의 개수를 구하는 메서드 입니다.
   */
  @Cron('*/5 * * * *')
  async getCounts() {
    const blockCount = await this.blockRepository.getDataCount();
    const transactionReceiptCount =
      await this.transactionReceiptRepository.getDataCount();
    const logCount = await this.logRepository.getDataCount();

    const message = `
*현재 데이터 개수*

> Blockㅤㅤㅤㅤㅤㅤㅤㅤ:   ${blockCount} 개
> TransactionReceiptㅤ:   ${transactionReceiptCount} 개
> Logㅤㅤㅤㅤㅤㅤㅤㅤㅤ:   ${logCount} 개
`;

    this.slackService.postLogToSlack(message);
  }
}
