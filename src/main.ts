import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: number = +process.env.PORT || 4000;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
