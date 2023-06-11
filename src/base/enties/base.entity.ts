import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  description: string;

  @CreateDateColumn({
    readonly: true,
  })
  createDate: Date;

  @UpdateDateColumn()
  modifyDate: Date;

  @DeleteDateColumn({ nullable: true })
  deleteDate: Date;
}
