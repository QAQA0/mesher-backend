import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/exception/filter/global-exception.filter';
import { EthersService } from './modules/ethers/ethers.service';
import { SlackService } from './modules/slack/slack.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const ethersService = app.get(EthersService);
  global.serverStartTime = Date.now();
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(SlackService)));

  const config = new DocumentBuilder()
    .setTitle('Mesher BlockChain')
    .setDescription('Mesher BlockChain API Docs')
    .setVersion('1.0')
    .addTag('mesher')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  //서버 실행 시 가져올 블럭 개수
  await ethersService.getDatas(0);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
