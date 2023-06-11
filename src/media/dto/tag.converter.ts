import { IConverter } from '@base';
import { Injectable } from '@nestjs/common';
import { Tag } from '../entities';
import { TagDto } from './tag.dto';
@Injectable()
export class TagConverter implements IConverter<TagDto, Tag> {
  toDto = (tags: Tag[] = []) => {
    return tags.filter(Boolean).map((tag) => {
      const dto = new TagDto();
      dto.name = tag.name;
      dto.id = tag.id;
      dto.createDate = tag.createDate;
      dto.deleteDate = tag.deleteDate;
      dto.modifyDate = tag.modifyDate;
      dto.description = tag.description;
      return dto;
    });
  };
  toEntity = (dtos: TagDto[] = []) => {
    return dtos.filter(Boolean).map((dto) => {
      const tag = new Tag();
      tag.id = dto.id;
      tag.name = dto.name;
      tag.createDate = dto.createDate;
      tag.modifyDate = dto.modifyDate;
      tag.deleteDate = dto.deleteDate;
      return tag;
    });
  };
}
