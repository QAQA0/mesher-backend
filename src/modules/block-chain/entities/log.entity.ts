import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('log')
export class LogEntity {
  @PrimaryColumn()
  logIndex: number;

  @Column()
  transactionHash: string;

  @Column()
  blockHash: string;

  @Column()
  blockNumber: number;

  @Column()
  address: string;

  @Column('simple-array')
  topics: string[];

  @Column()
  data: string;
}
