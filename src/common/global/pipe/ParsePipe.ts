import {
  HttpStatus,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
} from '@nestjs/common';

export const parseIntPipe = new ParseIntPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
});
export const parseIntArrarPipe = new ParseArrayPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  items: Number,
});

export const parseStringArrayPie = new ParseArrayPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
  items: String,
});

export const parseBoolPipe = new ParseBoolPipe({
  errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
});
