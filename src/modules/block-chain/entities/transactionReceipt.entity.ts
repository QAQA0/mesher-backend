import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('transaction_receipt')
export class TransactionReceiptEntity {
  @PrimaryColumn()
  transactionHash: string;

  @Column()
  blockHash: string;

  @Column()
  blockNumber: number;

  @Column()
  transactionIndex: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  cumulativeGasUsed: string;

  @Column()
  gasUsed: string;

  @Column()
  effectiveGasPrice: string;

  @Column()
  status: boolean;
}
