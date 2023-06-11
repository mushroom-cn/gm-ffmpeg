import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { DataResult } from '../data/';

export const ApiUpdateResponse = <T1 extends Type<any>>(t1: T1) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(DataResult) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(t1) },
              },
            },
          },
        ],
      },
    })
  );
};
