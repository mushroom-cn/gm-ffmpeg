import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gm7Error } from './Gm7Error';
export class BaseResult {
  @ApiPropertyOptional({ type: Gm7Error })
  public error: Gm7Error;
  @ApiProperty({
    type: 'number',
  })
  public status: number;
  constructor(status = HttpStatus.OK, error?: Gm7Error) {
    this.error = error;
    this.status = status;
  }
}

export class DataResult<T> extends BaseResult {
  @ApiProperty({
    type: 'number',
  })
  public totalCount: number;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'any',
    },
  })
  public data: T[];
  constructor(
    data: T[],
    totalCount: number,
    status = HttpStatus.OK,
    error?: Gm7Error
  ) {
    super(status, error);
    this.data = data;
    this.totalCount = totalCount;
  }
}
