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
import { Tag } from './tag.entity';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  description: string;

  // @Column({ type: 'blob' })
  // avator: Blob;

  @CreateDateColumn({
    readonly: true,
  })
  createDate: Date;

  @UpdateDateColumn()
  modifyDate: Date;

  @DeleteDateColumn({ nullable: true })
  deleteDate: Date;

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
