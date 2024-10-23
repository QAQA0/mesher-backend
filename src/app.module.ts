import { Module } from '@nestjs/common';
import { EthersModule } from './providers/ethers/ethers.module';
import { BlockChainController } from './modules/block-chain/controllers/block-chain.controller';
import { BlockChainModule } from './modules/block-chain/block-chain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './modules/block-chain/config/database/typeorm.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SlackModule } from './providers/slack/slack.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SlackModule,
    EthersModule,
    BlockChainModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfig,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [BlockChainController],
  exports: [EthersModule],
})
export class AppModule {}
