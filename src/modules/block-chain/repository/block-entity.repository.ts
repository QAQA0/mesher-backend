import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BlockEntity } from '../entities/block.entity';

@Injectable()
export class BlockEntityRepository {
  private blockRepository: Repository<BlockEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.blockRepository = this.dataSource.getRepository(BlockEntity);
  }

  save(blockEntity: BlockEntity) {
    return this.blockRepository.save(blockEntity);
  }

  saveAll(blockEntity: BlockEntity[]) {
    return this.blockRepository.save(blockEntity);
  }

  findBlockByHash(blockHash: string) {
    return this.blockRepository.findOne({ where: { hash: blockHash } });
  }

  async getDataCount() {
    return await this.blockRepository.count();
  }
}
