import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { ActorConverter, MediaConverter, TagConverter } from './dto';
import { ENTITIES } from './entities';
import { FileScanner } from './fileScanner.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { RtmpController } from './rtmp.controller';
import { RtmpService } from './rtmp.service';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  providers: [
    MediaService,
    TagService,
    ActorService,
    RtmpService,
    MediaConverter,
    ActorConverter,
    TagConverter,
    FileScanner,
  ],
  controllers: [
    MediaController,
    TagController,
    ActorController,
    RtmpController,
  ],
  exports: [TypeOrmModule],
})
export class MediaModule {}
