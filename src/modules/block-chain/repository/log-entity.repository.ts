import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LogEntity } from '../entities/log.entity';

@Injectable()
export class LogEntityRepository {
  private logRepository: Repository<LogEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.logRepository = this.dataSource.getRepository(LogEntity);
  }

  save(logEntity: LogEntity) {
    return this.logRepository.save(logEntity);
  }

  saveAll(logEntity: LogEntity[]) {
    return this.logRepository.save(logEntity);
  }

  findAllLogByBlockHash(blockHash: string) {
    return this.logRepository.find({
      where: { blockHash: blockHash },
    });
  }

  findAllByTransactionHash(transactionHash: string) {
    return this.logRepository.find({
      where: { transactionHash: transactionHash },
    });
  }

  async getDataCount() {
    return await this.logRepository.count();
  }
}
