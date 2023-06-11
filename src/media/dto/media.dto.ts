import { BaseDto } from '@base';
import { ApiProperty } from '@nestjs/swagger';
import { ActorDto } from './actor.dto';
import { TagDto } from './tag.dto';

export class MediaDto extends BaseDto {
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
    readOnly: true,
    required: true,
    nullable: false,
    maxLength: 255,
    minLength: 1,
  })
  mediaType: string;

  @ApiProperty({ type: Number, required: true, readOnly: true, default: 0 })
  size: number;

  @ApiProperty({ type: String })
  status: string;

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
