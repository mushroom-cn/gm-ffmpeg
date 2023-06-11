import { HttpStatus, ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
export const parseIntPipe = new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
});
export const parseIntArrarPipe = new ParseArrayPipe({ items: Number });
