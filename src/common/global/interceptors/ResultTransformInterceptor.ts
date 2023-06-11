import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataResult } from '../api-response';

@Injectable()
export class ResultTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const handlerName = context.getHandler().name.toLowerCase();
        switch (handlerName) {
          case 'list':
          case 'get':
            return { data: data[0], totalCount: data[1] } as DataResult<any>;
          case 'update':
          case 'create':
            return {
              data: data ?? [],
              totalCount: data?.length ?? 0,
            } as DataResult<any>;
          case 'delete':
            return {
              data: data?.raw,
              totalCount: data?.affected ?? 0,
            } as DataResult<any>;
          default:
            return data;
        }
      })
    );
  }
}
