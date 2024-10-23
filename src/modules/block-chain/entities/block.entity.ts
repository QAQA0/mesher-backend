import { Block } from 'ethers';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('block')
export class BlockEntity {
  @PrimaryColumn('varchar')
  hash: string;

  @Column('varchar')
  parentHash: string;

  @Column()
  number: number;

  @Column()
  timestamp: number;

  @Column({ type: 'varchar', nullable: true })
  nonce: string;

  @Column('bigint')
  difficulty: bigint;

  @Column('bigint')
  gasLimit: bigint;

  @Column('bigint')
  gasUsed: bigint;

  @Column({ type: 'varchar', nullable: true })
  miner: string;

  @Column({ type: 'bigint', nullable: true })
  baseFeePerGas: bigint;

  @Column('simple-array')
  transactions: string[];

  static builder() {
    return new BlockEntityBuilder();
  }
}

class BlockEntityBuilder {
  private blockEntity: BlockEntity;

  constructor() {
    this.blockEntity = new BlockEntity();
  }

  setHash(hash: string) {
    this.blockEntity.hash = hash;
    return this;
  }

  setParentHash(parentHash: string) {
    this.blockEntity.parentHash = parentHash;
    return this;
  }

  setNumber(number: number) {
    this.blockEntity.number = number;
    return this;
  }

  setTimestamp(timestamp: number) {
    this.blockEntity.timestamp = timestamp;
    return this;
  }

  setNonce(nonce: string) {
    this.blockEntity.nonce = nonce;
    return this;
  }

  setDifficulty(difficulty: bigint) {
    this.blockEntity.difficulty = difficulty;
    return this;
  }

  setGasLimit(gasLimit: bigint) {
    this.blockEntity.gasLimit = gasLimit;
    return this;
  }

  setGasUsed(gasUsed: bigint) {
    this.blockEntity.gasUsed = gasUsed;
    return this;
  }

  setMiner(miner: string) {
    this.blockEntity.miner = miner;
    return this;
  }

  setBaseFeePerGas(baseFeePerGas: bigint) {
    this.blockEntity.baseFeePerGas = baseFeePerGas;
    return this;
  }

  setTransactions(transactions: string[]) {
    this.blockEntity.transactions = transactions;
    return this;
  }

  build(): BlockEntity {
    return this.blockEntity;
  }
}
