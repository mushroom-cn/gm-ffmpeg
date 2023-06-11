import { IConverter } from '@base';
import { Inject, Injectable } from '@nestjs/common';
import { Media } from '../entities';
import { ActorConverter } from './actor.converter';
import { MediaDto } from './media.dto';
import { TagConverter } from './tag.converter';
@Injectable()
export class MediaConverter implements IConverter<MediaDto, Media> {
  constructor(
    @Inject(TagConverter)
    private tagConverter: TagConverter,
    @Inject(ActorConverter)
    private actorConverter: ActorConverter
  ) {}

  toDto = (medias: Media[] = []) => {
    return medias.filter(Boolean).map((media) => {
      const dto = new MediaDto();
      Object.assign(dto, media);
      if ('tags' in media) {
        dto.tags = this.tagConverter.toDto(media.tags);
      }
      if ('actors' in media) {
        dto.actors = this.actorConverter.toDto(media.actors);
      }
      return dto;
    });
  };

  toEntity = (mediaDtos: MediaDto[] = []) => {
    return mediaDtos.filter(Boolean).map((mediaDto) => {
      const actor = new Media();
      const { createDate, deleteDate, modifyDate, ...rest } = mediaDto;
      Object.assign(actor, rest);
      if ('tags' in mediaDto) {
        actor.tags = this.tagConverter.toEntity(mediaDto.tags);
      }
      if ('actors' in mediaDto) {
        actor.actors = this.actorConverter.toEntity(mediaDto.actors);
      }
      return actor;
    });
  };
}
