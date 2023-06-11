import '@common';
import { HttpExceptionFilter, logger } from '@common';
import '@media';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { AppModule } from './app.module';
import { ResultTransformInterceptor } from './common/global/interceptors/ResultTransformInterceptor';

// somewhere in your initialization file
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
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
  app.enableCors({
    //credentials: false, allowedHeaders: []
  });
  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/public/',
  // });
  // somewhere in your initialization file
  app.use(
    compression({
      threshold: 0,
      filter() {
        return true;
      },
    })
  );
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
