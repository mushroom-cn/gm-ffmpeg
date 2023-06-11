import { BaseDto } from '@base';
import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from './tag.dto';

export class ActorDto extends BaseDto {
  @ApiProperty({
    type: TagDto,
    isArray: true,
    required: false,
  })
  tags: TagDto[];
}
