import { DefaultValuePipe, Query } from '@nestjs/common';
import { parseIntPipe } from '../pipe';

export function PageQuery(name: 'page' | 'pageSize', defaultValue: number) {
  return Query(name, new DefaultValuePipe(defaultValue), parseIntPipe);
}
