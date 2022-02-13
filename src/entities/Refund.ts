import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Method } from './Method';
import { Order } from './Order';

@Index('refund_pkey', ['id'], { unique: true })
@Entity('refund', { schema: 'public' })
export class Refund {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'reason' })
  reason: string;

  @Column('boolean', { name: 'accepted', default: () => 'false' })
  accepted: boolean;

  @Column('character varying', { name: 'email', length: 250 })
  email: string;

  @CreateDateColumn()
  createdAt: Date | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => Method, (method) => method.refunds)
  @JoinColumn([{ name: 'method_id', referencedColumnName: 'id' }])
  method: Method;

  @ManyToOne(() => Order, (order) => order.refunds)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Order;
}
