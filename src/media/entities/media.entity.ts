import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Actor } from './actor.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'Media' })
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ type: 'text', readonly: true, unique: true })
  @Index()
  path: string;

  @Column({ type: 'text', readonly: true })
  @Index()
  target: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  description: string;

  @Column({ type: 'varchar', length: 50, readonly: true })
  mediaType: string;

  // @Column({ type: 'blob' })
  // coverImg: Blob;

  @CreateDateColumn({
    readonly: true,
  })
  createDate: Date;

  @UpdateDateColumn()
  modifyDate: Date;

  @DeleteDateColumn({ nullable: true })
  deleteDate: Date;

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
}
