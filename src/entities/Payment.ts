import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './Order';
import { Method } from './Method';
import { Users } from './Users';

@Index('payment_pkey', ['id'], { unique: true })
@Entity('payment', { schema: 'public' })
export class Payment {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'stripe_charge_id', length: 50 })
  stripeChargeId: string;

  @Column('integer', { name: 'amount' })
  amount: number;

  @Column('timestamp without time zone', { name: 'timestamp' })
  timestamp: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @OneToMany(() => Order, (order) => order.payment)
  orders: Order[];

  @ManyToOne(() => Method, (method) => method.payments)
  @JoinColumn([{ name: 'method_id', referencedColumnName: 'id' }])
  method: Method;

  @ManyToOne(() => Users, (users) => users.payments)
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;
}
