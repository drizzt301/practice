import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from './Payment';
import { Refund } from './Refund';

@Index('method_pkey', ['id'], { unique: true })
@Entity('method', { schema: 'public' })
export class Method {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 20 })
  name: string;

  @Column('integer', { name: 'code', nullable: true })
  code: number | null;

  @OneToMany(() => Payment, (payment) => payment.method)
  payments: Payment[];

  @OneToMany(() => Refund, (refund) => refund.method)
  refunds: Refund[];
}
