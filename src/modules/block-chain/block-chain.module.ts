import { Module } from '@nestjs/common';
import { BlockChainService } from './services/block-chain.sevice';
import { BlockChainController } from './controllers/block-chain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntity } from './entities/block.entity';
import { TransactionReceiptEntity } from './entities/transactionReceipt.entity';
import { BlockEntityRepository } from './repository/block-entity.repository';
import { TransactionReceiptEntityRepository } from './repository/transaction-receipt-entity.repository';
import { LogEntity } from './entities/log.entity';
import { LogEntityRepository } from './repository/log-entity.repository';
import { SlackModule } from '../slack/slack.module';

@Module({
  imports: [
    SlackModule,
    TypeOrmModule.forFeature([
      BlockEntity,
      TransactionReceiptEntity,
      LogEntity,
    ]),
  ],
  controllers: [BlockChainController],
  providers: [
    BlockChainService,
    BlockEntityRepository,
    TransactionReceiptEntityRepository,
    LogEntityRepository,
  ],
  exports: [BlockChainService],
})
export class BlockChainModule {}
