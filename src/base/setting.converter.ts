import { IConverter, Setting } from '@base';
import { Injectable } from '@nestjs/common';
import { SettingDto } from './dto/SettingDTO';
@Injectable()
export class SettingConverter implements IConverter<SettingDto, Setting> {
  toDto = (medias: Setting[] = []) => {
    return medias.filter(Boolean).map((media) => {
      const dto = new SettingDto();
      Object.assign(dto, media);
      return dto;
    });
  };

  toEntity = (mediaDtos: SettingDto[] = []) => {
    return mediaDtos.filter(Boolean).map((mediaDto) => {
      const actor = new Setting();
      const { createDate, deleteDate, modifyDate, ...rest } = mediaDto;
      Object.assign(actor, rest);
      return actor;
    });
  };
}
