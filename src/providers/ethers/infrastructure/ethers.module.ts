import { Module } from '@nestjs/common';
import { EthersService } from '../application/ethers.service';

@Module({
  providers: [EthersService],
  exports: [EthersService],
})
export class EthersModule {}
