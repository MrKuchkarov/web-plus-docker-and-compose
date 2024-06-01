import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import dotenv from 'dotenv';
dotenv.config();
const { SERVER_PORT = '' } = process.env;
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true })
    );
    app.enableCors();
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER)); // Использование WINSTON_MODULE_NEST_PROVIDER как логгера
    await app.listen(SERVER_PORT);
  } catch (error) {
    console.error('Ошибка при запуске приложения:', error);
    throw error; // Чтобы передать ошибку дальше
  }
}
bootstrap().catch(error => {
  console.error('Ошибка при запуске приложения:', error);
  process.exit(1);
});
