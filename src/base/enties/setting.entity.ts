import { Column, Entity, Index } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Setting extends Base {
  @Column({ type: 'varchar', length: 20, unique: true })
  @Index()
  resourceId: string;

  @Column({ type: 'text', nullable: true })
  data: string;
}
