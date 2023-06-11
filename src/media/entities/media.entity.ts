import { Base } from '@base';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { Actor } from './actor.entity';
import { Tag } from './tag.entity';

export enum MediaStatus {
  Loading = '0',
  Creating = '20',
  Done = '100',
}
@Entity({ name: 'Media' })
export class Media extends Base {
  @Column({ type: 'text', readonly: true, unique: true })
  @Index()
  path: string;

  @Column({ type: 'text', readonly: true })
  @Index()
  target: string;

  @Column({ type: 'varchar', length: 50, readonly: true })
  mediaType: string;

  // @Column({ type: 'blob' })
  // coverImg: Blob;

  @Column({ type: 'integer', readonly: true })
  size: number;

  // @Column({ type: 'integer', readonly: true })
  // createBy: string;

  @ManyToMany(() => Actor, (actor) => actor.id, {
    eager: true,
    cascade: true,
    nullable: true,
    orphanedRowAction: 'nullify',
  })
  @JoinTable()
  actors: Actor[];

  @ManyToMany(() => Tag, (tag) => tag.id, {
    cascade: true,
    nullable: true,
    orphanedRowAction: 'nullify',
    eager: true,
  })
  @JoinTable()
  tags: Tag[];

  @Column({ type: 'text' })
  status: string;
}
