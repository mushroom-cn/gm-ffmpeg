import { Inject, Injectable } from '@nestjs/common';
import { Actor } from '../entities/';
import { ActorDto } from './actor.dto';
import { TagConverter } from './tag.converter';
@Injectable()
export class ActorConverter {
  constructor(
    @Inject(TagConverter)
    private tagConverter: TagConverter,
  ) {}
  toDto = (actors: Actor[] = []) => {
    return actors.filter(Boolean).map((actor) => {
      const dto = new ActorDto();
      Object.assign(dto, actor);
      if ('tags' in actor) {
        dto.tags = this.tagConverter.toDto(actor.tags);
      }
      return dto;
    });
  };

  toEntity = (dtos: ActorDto[] = []) => {
    return dtos.filter(Boolean).map((dto) => {
      const actor = new Actor();
      const { createDate, deleteDate, modifyDate, ...rest } = dto;
      Object.assign(actor, rest);
      if ('tags' in dto) {
        actor.tags = this.tagConverter.toEntity(dto.tags);
      }
      return actor;
    });
  };
}
