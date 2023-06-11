import { HttpExceptionFilter, logger } from '@common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import './common';
import { ResultTransformInterceptor } from './common/global/interceptors/ResultTransformInterceptor';
import './media';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
    cors: true,
  });
  const config = new DocumentBuilder()
    .setTitle('gm-ffmpge')
    .setDescription('The ffmpeg API description')
    .setVersion('1.0')
    .setContact('', '', '')
    .setLicense('MIT', '')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup('api', app, document);
  // app.useGlobalFilters(new I18nValidationExceptionFilter());
  // app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResultTransformInterceptor());
  await app.listen(3000);
}
bootstrap();
