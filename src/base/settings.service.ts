import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IConverter, SettingDto } from './dto';
import { Setting } from './enties';
import { BaseService } from './services';
import { SettingConverter } from './setting.converter';

@Injectable()
export class SettingService extends BaseService<SettingDto, Setting> {
  constructor(
    @Inject(SettingConverter)
    protected converter: IConverter<SettingDto, Setting>,
    @InjectRepository(Setting)
    protected repo: Repository<Setting>
  ) {
    super();
  }
}
