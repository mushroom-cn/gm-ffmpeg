import { DEFAULT_PAGE_QUERY } from '@common';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { IConvertableEntity, IConverter, IEntity } from './dto';

@Injectable()
export abstract class BaseService<
  D extends IEntity,
  E extends IConvertableEntity,
> {
  protected converter: IConverter<D, E>;
  protected repo: Repository<E>;

  upsert(dto: D[]) {
    return this.repo.upsert(this.converter.toEntity(dto), {
      conflictPaths: {},
      skipUpdateIfNoValuesChanged: true,
    });
  }

  async create(dto: D[]) {
    return this.converter.toDto(
      await this.repo.save(
        this.converter.toEntity(
          dto.map((v) => {
            delete v.id;
            return v;
          }),
        ),
      ),
    );
  }

  async update(dto: D) {
    const entity = this.converter.toEntity([dto])[0];
    const result = await this.repo.update(entity.id, entity);
    return this.converter.toDto(result.raw);
  }

  async find({
    where,
    page = DEFAULT_PAGE_QUERY.page,
    pageSize = DEFAULT_PAGE_QUERY.pageSize,
  }: {
    where?: FindOptionsWhere<E>;
    page?: number;
    pageSize?: number;
  }) {
    const result = await this.repo.findAndCount({
      where,
      skip: page * pageSize,
      take: pageSize,
    });
    return [this.converter.toDto(result[0]), result[1]] as [D[], number];
  }

  async findById({
    ids,
    page = DEFAULT_PAGE_QUERY.page,
    pageSize = DEFAULT_PAGE_QUERY.pageSize,
  }: {
    ids: number[];
    page?: number;
    pageSize?: number;
  }) {
    if (!ids?.length) {
      return null;
    }
    const result = await this.repo.findAndCount({
      where: {
        id: In(ids),
      } as any,
      skip: page * pageSize,
      take: pageSize,
    });
    return [this.converter.toDto(result[0]), result[1]] as [D[], number];
  }

  async softRemove(ids: number[]) {
    const [medias] = await this.findById({ ids: ids });
    if (!medias.length) {
      return;
    }
    const result = await this.repo.softRemove(this.converter.toEntity(medias));
    return this.converter.toDto(result);
  }

  async delete(ids: number[]) {
    if (!ids?.length) {
      return;
    }
    const result = await this.repo.delete(ids);
    return {
      ...result,
      raw: this.converter.toDto(result?.raw),
    };
  }
}
