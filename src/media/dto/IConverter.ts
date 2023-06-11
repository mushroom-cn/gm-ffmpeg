import { ObjectLiteral } from 'typeorm';

export interface IConverter<D, E extends ObjectLiteral & { id: number }> {
  toDto: (actors: E[]) => D[];
  toEntity: (actors: D[]) => E[];
}

export type IEntity = { id: number };
export type IConvertableEntity = ObjectLiteral & IEntity;
