import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true});
  app.enableCors();

  await app.listen(3000);
  Logger.log('Main application running...');
}
bootstrap();
