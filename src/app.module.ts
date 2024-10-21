import { Module } from '@nestjs/common';
import { EthersModule } from './ethers/ethers.module';
import { BlockChainController } from './block-chain/block-chain.controller';

@Module({
  imports: [EthersModule],
  controllers: [BlockChainController],
  exports: [EthersModule]
})
export class AppModule {}
