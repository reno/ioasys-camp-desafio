import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import envVariables from '@config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({ origin: 'http://tamojunto.vercel.app'});

  const logger = new Logger('NestApplication');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ioasys camp - Tamojunto')
    .setVersion('1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  
  config.update({
    accessKeyId: envVariables().awsAccessKey,
    secretAccessKey: envVariables().awsSecretKey,
    region: envVariables().awsRegion,
  });

  await app.listen(envVariables().port, () =>
    logger.log(`API is running on port ${envVariables().port}`),
  );
}
bootstrap();
