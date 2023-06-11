import { BaseService, IConverter } from '@base';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActorConverter, ActorDto } from './dto';
import { Actor } from './entities';
import { TagService } from './tag.service';

@Injectable()
export class ActorService extends BaseService<ActorDto, Actor> {
  constructor(
    @Inject(TagService)
    private readonly tagService: TagService,
    @Inject(ActorConverter)
    protected converter: IConverter<ActorDto, Actor>,
    @InjectRepository(Actor)
    protected repo: Repository<Actor>
  ) {
    super();
  }

  async addTag(actorId: number, tagIds: number[]) {
    const actor = (await this.findById({ ids: [actorId] }))?.[0]?.[0];
    if (!actor) {
      return;
    }
    const actorTags = await actor.tags;
    const tag = (await this.tagService.findById({ ids: tagIds }))?.[0];
    if (!tag?.length) {
      return;
    }
    Array.prototype.push.apply(actorTags, tag);
    actor.tags = actorTags;
    return this.repo.save(actor);
  }

  async removeTag(actorId: number, tagIds: number[]) {
    const actor = (await this.findById({ ids: [actorId] }))?.[0]?.[0];
    if (!actor) {
      return;
    }
    const mediaTags = await actor.tags;
    const tagIdMap = Object.fromEntries(tagIds.map((v) => [v, v]));
    actor.tags = mediaTags.filter((v) => !tagIdMap[v.id]);
    return this.repo.save(actor);
  }
}
