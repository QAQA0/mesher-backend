import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('transaction_receipt')
export class TransactionReceiptEntity {
  @PrimaryColumn('varchar')
  transactionHash: string;

  @Column('varchar')
  blockHash: string;

  @Column()
  blockNumber: number;

  @Column()
  transactionIndex: number;

  @Column('varchar')
  from: string;

  @Column({ type: 'varchar', nullable: true })
  to: string;

  @Column('bigint')
  cumulativeGasUsed: bigint;

  @Column('bigint')
  gasUsed: bigint;

  @Column('bigint')
  gasPrice: bigint;

  @Column({ nullable: true })
  status: number;

  static builder() {
    return new TransactionReceiptEntityBuilder();
  }
}

class TransactionReceiptEntityBuilder {
  private transactionReceiptEntity: TransactionReceiptEntity;

  constructor() {
    this.transactionReceiptEntity = new TransactionReceiptEntity();
  }

  setTransactionHash(transactionHash: string) {
    this.transactionReceiptEntity.transactionHash = transactionHash;
    return this;
  }

  setBlockHash(blockHash: string) {
    this.transactionReceiptEntity.blockHash = blockHash;
    return this;
  }

  setBlockNumber(blockNumber: number) {
    this.transactionReceiptEntity.blockNumber = blockNumber;
    return this;
  }

  setTransactionIndex(transactionIndex: number) {
    this.transactionReceiptEntity.transactionIndex = transactionIndex;
    return this;
  }

  setFrom(from: string) {
    this.transactionReceiptEntity.from = from;
    return this;
  }

  setTo(to: string) {
    this.transactionReceiptEntity.to = to;
    return this;
  }

  setCumulativeGasUsed(cumulativeGasUsed: bigint) {
    this.transactionReceiptEntity.cumulativeGasUsed = cumulativeGasUsed;
    return this;
  }

  setGasUsed(gasUsed: bigint) {
    this.transactionReceiptEntity.gasUsed = gasUsed;
    return this;
  }

  setGasPrice(gasPrice: bigint) {
    this.transactionReceiptEntity.gasPrice = gasPrice;
    return this;
  }

  setStatus(status: number) {
    this.transactionReceiptEntity.status = status;
    return this;
  }

  build(): TransactionReceiptEntity {
    return this.transactionReceiptEntity;
  }
}
