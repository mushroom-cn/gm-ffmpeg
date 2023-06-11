import { DEFAULT_DATE_ISO_8601_FORMAT } from '@common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
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
  })
  name: string;

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
}
