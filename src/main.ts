import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  /* CORS */
  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  /* Swagger */
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Server')
    .setDescription('JWT-Auth')
    .setVersion('1.0')
    .addTag('...')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}

bootstrap();
