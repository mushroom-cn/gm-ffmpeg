import { ApiCustomHeaders, LocaleLang, changeLang } from '@common';
import { Controller, Inject, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { SettingService } from './settings.service';
@Controller('/lang')
@ApiTags('lang')
@ApiCustomHeaders()
export class LanguageController {
  constructor(
    @Inject(SettingService)
    private readonly settingService: SettingService
  ) {}

  @Put('/change/lang')
  @ApiQuery({
    enum: LocaleLang,
    name: 'lang',
  })
  changeLang(@Query('lang') lang: LocaleLang, @I18n() i18n: I18nContext) {
    changeLang(lang);
  }
}
