import { i18n } from '@i18n';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getTypeorm } from './db';
import { MediaModule } from './media';
import { getServeStaticModule } from './serve.static';
import { SettingsController } from './settings.controller';
const x = getServeStaticModule();

@Module({
  imports: [i18n, x, getTypeorm(), MediaModule],
  controllers: [AppController, SettingsController],
  providers: [AppService],
})
export class AppModule {}
