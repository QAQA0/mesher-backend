import { Module } from '@nestjs/common';
import { BlockChainService } from './services/block-chain.sevice';
import { EthersModule } from '../../providers/ethers/ethers.module';
import { BlockChainController } from './controllers/block-chain.controller';

@Module({
  imports: [EthersModule],
  controllers: [BlockChainController],
  providers: [BlockChainService],
  exports: [BlockChainService],
})
export class BlockChainModule {}
