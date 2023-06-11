import { DEFAULT_DATE_ISO_8601_FORMAT } from '@common';
import { ApiProperty } from '@nestjs/swagger';
import { ActorDto } from './actor.dto';
import { TagDto } from './tag.dto';

export class MediaDto {
  @ApiProperty({
    type: Number,
    readOnly: true,
    required: true,
    nullable: false,
  })
  id: number;

  @ApiProperty({
    type: String,
    default: '',
    maxLength: 255,
    minLength: 1,
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    minLength: 1,
  })
  path: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  target: string;

  @ApiProperty({
    type: String,
    nullable: true,
    default: '',
    maxLength: 255,
    minLength: 1,
    required: false,
  })
  description: string;

  @ApiProperty({
    type: String,
    readOnly: true,
    required: true,
    nullable: false,
    maxLength: 255,
    minLength: 1,
  })
  mediaType: string;

  @ApiProperty({ type: Number, required: true, readOnly: true, default: 0 })
  size: number;

  @ApiProperty({
    type: Date,
    nullable: false,
    readOnly: true,
    format: DEFAULT_DATE_ISO_8601_FORMAT,
  })
  createDate: Date;

  @ApiProperty({
    type: Date,
    nullable: false,
    readOnly: true,
    format: DEFAULT_DATE_ISO_8601_FORMAT,
  })
  modifyDate: Date;

  @ApiProperty({
    type: Date,
    nullable: true,
    readOnly: true,
    format: DEFAULT_DATE_ISO_8601_FORMAT,
  })
  deleteDate: Date;

  @ApiProperty({
    type: ActorDto,
    nullable: false,
    isArray: true,
    required: false,
  })
  actors: ActorDto[];

  @ApiProperty({
    type: TagDto,
    isArray: true,
    required: false,
  })
  tags: TagDto[];
}
