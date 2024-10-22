import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('block')
export class BlockEntity {
  @PrimaryColumn()
  hash: string;

  @Column()
  parentHash: string;

  @Column()
  number: number;

  @Column()
  timestamp: number;

  @Column()
  nonce: string;

  @Column()
  difficulty: string;

  @Column()
  gasLimit: string;

  @Column()
  gasUsed: string;

  @Column()
  miner: string;

  @Column()
  baseFeePerGas: string;

  @Column('simple-array')
  transactions: string[];
}
