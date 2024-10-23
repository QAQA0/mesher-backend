import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'blockchain',
      synchronize: false,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: true,
      entities: [`${__dirname}/../entities/*.entity{.ts,.js}`],
      extra: {
        max: 20,
      },
    } as TypeOrmModuleOptions;
  }
}
