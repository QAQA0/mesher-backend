import { BlockEntity } from '../entities/block.entity';
import { LogEntity } from '../entities/log.entity';
import { TransactionReceiptEntity } from '../entities/transactionReceipt.entity';

export class BlockWithTransactionReceiptAndLogDto {
  block: BlockEntity;
  transactionReceipts: TransactionReceiptEntity[];
  logs: LogEntity[];

  constructor(
    block: BlockEntity,
    transactionReceipts: TransactionReceiptEntity[],
    logs: LogEntity[],
  ) {
    this.block = block;
    this.transactionReceipts = transactionReceipts;
    this.logs = logs;
  }
}
