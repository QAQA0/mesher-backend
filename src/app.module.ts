import { Module } from '@nestjs/common';
import { EthersModule } from './providers/ethers/ethers.module';
import { BlockChainController } from './modules/block-chain/controllers/block-chain.controller';
import { BlockChainModule } from './modules/block-chain/block-chain.module';

@Module({
  imports: [EthersModule, BlockChainModule],
  controllers: [BlockChainController],
  exports: [EthersModule],
})
export class AppModule {}
