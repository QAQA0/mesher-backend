import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blockchain',
      synchronize: true,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: true,
      entities: [`${__dirname}/../../entities/*.entity{.ts,.js}`],
      extra: {
        max: 100,
      },
    } as TypeOrmModuleOptions;
  }
}
