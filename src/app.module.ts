import { BaseModule } from '@base';
import { i18n } from '@i18n';
import { MediaModule } from '@media';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getTypeorm } from './db';
import { getServeStaticModule } from './serve.static';
@Module({
  imports: [
    i18n,
    getServeStaticModule(),
    getTypeorm(),
    BaseModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
