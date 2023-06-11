import { Base } from '@base';
import { Entity } from 'typeorm';

@Entity()
export class Tag extends Base {
  // @Column({ type: 'integer', readonly: true })
  // createBy: string;
}
