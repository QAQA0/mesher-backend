import { Module } from '@nestjs/common';
import { BlockChainController } from './modules/block-chain/controllers/block-chain.controller';
import { BlockChainModule } from './modules/block-chain/block-chain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './modules/block-chain/config/typeorm.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { EthersModule } from './modules/ethers/ethers.module';
import { SlackModule } from './modules/slack/slack.module';

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
