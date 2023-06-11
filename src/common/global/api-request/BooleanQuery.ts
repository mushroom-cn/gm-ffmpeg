import { DefaultValuePipe, Query } from '@nestjs/common';
import { parseBoolPipe } from '../pipe';

export function BooleanQuery(name: string, defaultValue: boolean) {
  return Query(name, new DefaultValuePipe(defaultValue), parseBoolPipe);
}
