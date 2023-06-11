import { BaseService, IConverter } from '@base';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActorService } from './actor.service';
import { MediaConverter, MediaDto } from './dto';
import { Media } from './entities';
import { TagService } from './tag.service';

@Injectable()
export class MediaService extends BaseService<MediaDto, Media> {
  constructor(
    @Inject(ActorService)
    private readonly actorService: ActorService,
    @Inject(TagService)
    private readonly tagService: TagService,
    @Inject(MediaConverter)
    protected converter: IConverter<MediaDto, Media>,
    @InjectRepository(Media)
    protected repo: Repository<Media>
  ) {
    super();
  }

  async addActor(mediaId: number, actorIds: number[]) {
    const media = (await this.findById({ ids: [mediaId] }))?.[0]?.[0];
    if (!media || !actorIds.length) {
      return;
    }
    const mediaActors = await media.actors;
    const actors = (await this.actorService.findById({ ids: actorIds }))?.[0];
    if (!actors?.length) {
      return;
    }
    Array.prototype.push.apply(mediaActors, actors);
    media.actors = mediaActors;
    return this.repo.save(this.converter.toEntity([media]));
  }

  async removeActor(mediaId: number, actorIds: number[]) {
    const media = (await this.findById({ ids: [mediaId] }))?.[0]?.[0];
    if (!media || !actorIds.length) {
      return;
    }
    const mediaTags = await media.actors;
    const actorIdMap = Object.fromEntries(actorIds.map((v) => [v, v]));
    media.actors = mediaTags.filter((v) => !actorIdMap[v.id]);
    return this.repo.save(this.converter.toEntity([media]));
  }

  async addTag(mediaId: number, tagIds: number[]) {
    const media = (await this.findById({ ids: [mediaId] }))?.[0]?.[0];
    if (!media || !tagIds.length) {
      return;
    }
    const mediaTags = await media.tags;
    const tag = (await this.tagService.findById({ ids: tagIds }))?.[0];
    if (!tag?.length) {
      return;
    }
    Array.prototype.push.apply(mediaTags, tag);
    media.tags = mediaTags;
    return this.repo.save(this.converter.toEntity([media]));
  }

  async removeTag(mediaId: number, tagIds: number[]) {
    const media = (await this.findById({ ids: [mediaId] }))?.[0]?.[0];
    if (!media || !tagIds.length) {
      return;
    }
    const mediaTags = await media.tags;
    const tagIdMap = Object.fromEntries(tagIds.map((v) => [v, v]));
    media.tags = mediaTags.filter((v) => !tagIdMap[v.id]);
    return this.repo.save(this.converter.toEntity([media]));
  }
}
