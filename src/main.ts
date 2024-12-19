import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // Enable Cross-Origin Resource Sharing
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  console.log('port:', port);
  await app.listen(port);
}
bootstrap();
// console.log('Database URL:', process.env.DATABASE_URL); // This will help you confirm the value
