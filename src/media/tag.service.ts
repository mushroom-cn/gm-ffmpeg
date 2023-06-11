import { BaseService, IConverter } from '@base';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagConverter, TagDto } from './dto';
import { Tag } from './entities';

@Injectable()
export class TagService extends BaseService<TagDto, Tag> {
  constructor(
    @Inject(TagConverter)
    protected converter: IConverter<TagDto, Tag>,
    @InjectRepository(Tag)
    protected repo: Repository<Tag>
  ) {
    super();
  }
}
