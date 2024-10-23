import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('log')
export class LogEntity {
  @PrimaryColumn()
  logIndex: number;

  @Column('varchar')
  transactionHash: string;

  @Column('varchar')
  blockHash: string;

  @Column()
  blockNumber: number;

  @Column('varchar')
  address: string;

  @Column('simple-array')
  topics: string[];

  @Column('varchar')
  data: string;

  static builder() {
    return new LogEntityBuilder();
  }
}

class LogEntityBuilder {
  private logEntity: LogEntity;

  constructor() {
    this.logEntity = new LogEntity();
  }

  setLogIndex(logIndex: number) {
    this.logEntity.logIndex = logIndex;
    return this;
  }

  setTransactionHash(transactionHash: string) {
    this.logEntity.transactionHash = transactionHash;
    return this;
  }

  setBlockHash(blockHash: string) {
    this.logEntity.blockHash = blockHash;
    return this;
  }

  setBlockNumber(blockNumber: number) {
    this.logEntity.blockNumber = blockNumber;
    return this;
  }

  setAddress(address: string) {
    this.logEntity.address = address;
    return this;
  }

  setTopics(topics: string[]) {
    this.logEntity.topics = topics;
    return this;
  }

  setData(data: string) {
    this.logEntity.data = data;
    return this;
  }

  build(): LogEntity {
    return this.logEntity;
  }
}
