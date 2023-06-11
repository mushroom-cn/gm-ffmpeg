import { HttpStatus, Type } from '@nestjs/common';
import { getSchemaPath } from '@nestjs/swagger';
import { BaseResult } from '../data/';
export function getBaseResultSchema(status: HttpStatus) {
  return {
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) },
        {
          properties: {
            status: {
              type: 'number',
              default: status,
            },
          },
        },
      ],
    },
  };
}

export function getDataResultSchema<T1 extends Type<any>>(t1: T1) {
  return {
    schema: {
      allOf: [
        { $ref: getSchemaPath(BaseResult) }, // BaseResult 模拟 DataResult
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(t1) },
            },
          },
        },
        {
          properties: {
            totalCount: {
              type: 'number',
            },
          },
        },
      ],
    },
  };
}
