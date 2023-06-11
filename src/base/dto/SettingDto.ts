import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './BaseDto';

export class SettingDto extends BaseDto {
  @ApiProperty({
    type: String,
    maxLength: 10,
    minLength: 1,
    uniqueItems: true,
    required: true,
  })
  resourceId: string;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  data: string;
}
