import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { getDefaultApiResponseDecorators } from './common';
import { getDataResultSchema } from './utils';

export const ApiGm7Response = <T1 extends Type<any>>(t1: T1) => {
  return applyDecorators(
    ApiOkResponse(getDataResultSchema(t1)),
    ...getDefaultApiResponseDecorators()
  );
};
