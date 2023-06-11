import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Gm7Error extends HttpException {
  @ApiProperty({ type: String })
  public code: string;
  @ApiProperty({ type: String })
  public message: string;
  constructor(code: string, message: string) {
    super(message, 500);
    this.code = code;
    this.message = message;
  }
}
