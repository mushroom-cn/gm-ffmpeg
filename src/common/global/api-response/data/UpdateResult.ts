import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gm7Error } from './Gm7Error';

export class UpdateResult<T> {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'any',
    },
  })
  public data: T[];
  @ApiProperty({ type: 'number' })
  public totaclCOunt: number;
  @ApiPropertyOptional({ type: Gm7Error })
  public error: Gm7Error;
  constructor(data: T[], totaclCOunt: number, error: Gm7Error) {
    this.data = data;
    this.totaclCOunt = totaclCOunt;
    this.error = error;
  }
}
