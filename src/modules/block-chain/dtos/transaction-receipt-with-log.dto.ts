import { LogEntity } from '../entities/log.entity';
import { TransactionReceiptEntity } from '../entities/transactionReceipt.entity';

export class TransactionReceiptWithLogDto {
  transactionReceipt: TransactionReceiptEntity;
  logs: LogEntity[];

  constructor(
    transactionReceipt: TransactionReceiptEntity,
    logs: LogEntity[],
  ) {
    this.transactionReceipt = transactionReceipt;
    this.logs = logs;
  }
}
