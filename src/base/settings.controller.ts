import {
  ApiCustomHeaders,
  ApiDeleteResponse,
  ApiGm7Response,
  BooleanQuery,
  DEFAULT_PAGE_QUERY,
  PageQuery,
  parseIntPipe,
} from '@common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { In } from 'typeorm';
import { SettingDto } from './dto';
import { Setting } from './enties';
import { BaseService } from './services';
import { SettingService } from './settings.service';
@Controller('/settings')
@ApiTags('settings')
@ApiCustomHeaders()
export class SettingsController {
  constructor(
    @Inject(SettingService)
    private readonly settingService: BaseService<SettingDto, Setting>
  ) {}

  @Post()
  @ApiBody({ type: SettingDto })
  @ApiGm7Response(SettingDto)
  create(@Body() setting: SettingDto) {
    delete setting.id;
    return this.settingService.create([setting]);
  }

  @Put()
  @ApiBody({ type: SettingDto })
  @ApiGm7Response(SettingDto)
  update(@Body() setting: SettingDto) {
    return this.settingService.update(setting);
  }

  @Delete()
  @ApiQuery({ type: Number, isArray: true, name: 'id' })
  @ApiQuery({ type: Boolean, required: false, name: 'force' })
  @ApiDeleteResponse(SettingDto)
  softDelete(
    @Query('id', parseIntPipe) id: number,
    @BooleanQuery('force', false) force: boolean
  ) {
    if (force) {
      return this.settingService.delete([id]);
    }
    return this.settingService.softDelete([id]);
  }

  @Put('/restore')
  @ApiQuery({ type: Number, name: 'id' })
  @ApiGm7Response(SettingDto)
  async restore(@Query('id') id: number) {
    const media = await this.settingService.restore([id]);
    return media;
  }

  @Get()
  @ApiQuery({
    type: String,
    name: 'id',
  })
  @ApiGm7Response(SettingDto)
  get(@Query('id') id: string) {
    return this.settingService.find({
      where: {
        resourceId: In([id]),
      },
    });
  }

  @Get('/list')
  @ApiQuery({
    type: Number,
    name: 'page',
    required: false,
  })
  @ApiQuery({
    type: Number,
    name: 'pageSize',
    required: false,
  })
  @Header('Cache-Control', 'none')
  @ApiGm7Response(SettingDto)
  list(
    @PageQuery('page', DEFAULT_PAGE_QUERY.page) page: number,
    @PageQuery('pageSize', DEFAULT_PAGE_QUERY.pageSize)
    pageSize: number
  ) {
    return this.settingService.find({
      page,
      pageSize,
    });
  }
}
