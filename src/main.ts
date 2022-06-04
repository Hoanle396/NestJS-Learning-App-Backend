import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  const afterMonth = new Date(new Date().setDate(new Date().getDate()+30))
  const Now = new Date()   
  console.log(Now);
  console.log(afterMonth)
  console.log(afterMonth.getTime()/60000-Now.getDate()/60000)
}
bootstrap();
