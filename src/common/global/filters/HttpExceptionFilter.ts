import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';
import { BaseResult, Gm7Error } from '../api-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const { message, code } = exception.getResponse() as any;
    response
      .status(status)
      .json(new BaseResult(status, new Gm7Error(`${code}`, message)));
  }
}
