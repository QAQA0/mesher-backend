import { Module } from '@nestjs/common';
import { EthersService } from '../ethers/ethers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockEntityRepository } from '../../modules/block-chain/repository/block-entity.repository';
import { TransactionReceiptEntityRepository } from '../../modules/block-chain/repository/transaction-receipt-entity.repository';
import { BlockEntity } from '../../modules/block-chain/entities/block.entity';
import { TransactionReceiptEntity } from '../../modules/block-chain/entities/transactionReceipt.entity';
import { LogEntity } from 'src/modules/block-chain/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlockEntity, TransactionReceiptEntity, LogEntity])],
  providers: [
    EthersService,
    BlockEntityRepository,
    TransactionReceiptEntityRepository,
  ],
  exports: [EthersService],
})
export class EthersModule {}
