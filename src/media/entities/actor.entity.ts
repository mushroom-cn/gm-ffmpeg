import { Base } from '@base';
import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Actor extends Base {
  // @Column({ type: 'blob' })
  // avator: Blob;

  @ManyToMany(() => Tag, (tag) => tag.id, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
    orphanedRowAction: 'nullify',
    nullable: true,
  })
  @JoinTable()
  tags: Tag[];

  // @Column({ type: 'integer', readonly: true })
  // createBy: string;
}
