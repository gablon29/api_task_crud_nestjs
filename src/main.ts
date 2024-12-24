import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // habilitamos validationPipe
  app.useGlobalPipes(new ValidationPipe());

  // levantamos el servidor
  // habilitamos cors
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
