import { applyDecorators } from '@nestjs/common';
import { ApiHeaders } from '@nestjs/swagger';
import { LocaleLang } from '../../../constants';

export const ApiCustomHeaders = () => {
  return applyDecorators(
    ApiHeaders([
      {
        name: 'lang',
        enum: LocaleLang,
      },
    ])
  );
};
