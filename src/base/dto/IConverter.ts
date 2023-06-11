import { ObjectLiteral } from 'typeorm';
export type IEntity = { id: number };
export type IConvertableEntity = ObjectLiteral & IEntity;
export interface IConverter<DTO, Entity extends IConvertableEntity> {
  toDto: (actors: Entity[]) => DTO[];
  toEntity: (actors: DTO[]) => Entity[];
}
