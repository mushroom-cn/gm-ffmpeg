import { LocaleLang, changeLang } from '@common';
import { Controller, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { ApiCustomHeaders } from './common/global/api-response/decorators/ApiCustomHeaders';
@Controller('/settings')
@ApiTags('settings')
@ApiCustomHeaders()
export class SettingsController {
  constructor(private i18n: I18nService) {}

  @Put('/change/lang')
  @ApiQuery({
    enum: LocaleLang,
    name: 'lang',
  })
  changeLang(@Query('lang') lang: LocaleLang, @I18n() i18n: I18nContext) {
    changeLang(lang);
  }
}
