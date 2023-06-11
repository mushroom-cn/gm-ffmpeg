import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  description: string;

  @CreateDateColumn({ readonly: true })
  createDate: Date;

  @UpdateDateColumn()
  modifyDate: Date;

  @DeleteDateColumn({ nullable: true })
  deleteDate: Date;
  // @Column({ type: 'integer', readonly: true })
  // createBy: string;
}
