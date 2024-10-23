import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TransactionReceiptEntity } from '../entities/transactionReceipt.entity';

@Injectable()
export class TransactionReceiptEntityRepository {
  private transactionReceiptRepository: Repository<TransactionReceiptEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.transactionReceiptRepository = this.dataSource.getRepository(
      TransactionReceiptEntity,
    );
  }

  save(transactionEntity: TransactionReceiptEntity) {
    return this.transactionReceiptRepository.save(transactionEntity);
  }

  saveAll(transactionEntities: TransactionReceiptEntity[]) {
    return this.transactionReceiptRepository.save(transactionEntities);
  }

  findOne(hash: string) {
    return this.transactionReceiptRepository.findOne({
      where: { transactionHash: hash },
    });
  }

  findAllByBlockHash(blockHash: string) {
    return this.transactionReceiptRepository.find({
      where: { blockHash: blockHash },
    });
  }

  async getDataCount() {
    return await this.transactionReceiptRepository.count();
  }
}
