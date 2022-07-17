import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { HeadersInterceptor } from './core/interceptors/headers.interceptor';

const PORT: number = +process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const rootDir = dirname(__dirname);
  const API = await readFile(join(rootDir, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(API);

  SwaggerModule.setup('doc', app, document);

  app.useGlobalInterceptors(new HeadersInterceptor());

  await app.listen(PORT);
}
bootstrap();
