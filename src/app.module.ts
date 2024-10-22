import { Module } from '@nestjs/common';
import { EthersModule } from './providers/ethers/infrastructure/ethers.module';
import { BlockChainController } from './modules/block-chain/infrastructure/block-chain.controller';

@Module({
  imports: [EthersModule],
  controllers: [BlockChainController],
  exports: [EthersModule],
})
export class AppModule {}
