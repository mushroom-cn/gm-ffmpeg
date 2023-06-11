import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './enties';
import { LanguageController } from './language.controller';
import { SettingConverter } from './setting.converter';
import { SettingsController } from './settings.controller';
import { SettingService } from './settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting])],
  providers: [SettingService, SettingConverter],
  controllers: [SettingsController, LanguageController],
  exports: [TypeOrmModule, SettingService],
})
export class BaseModule {}
