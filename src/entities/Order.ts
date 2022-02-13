import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './Address';
import { Coupon } from './Coupon';
import { Payment } from './Payment';
import { State } from './State';
import { Users } from './Users';
import { OrderProducts } from './OrderProducts';
import { Refund } from './Refund';

@Index('order_pkey', ['id'], { unique: true })
@Entity('order', { schema: 'public' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('timestamp without time zone', { name: 'start_date' })
  startDate: Date;

  @Column('timestamp without time zone', {
    name: 'ordered_date',
    nullable: true,
  })
  orderedDate: Date | null;

  @Column('boolean', { name: 'is_ordered', default: () => 'false' })
  isOrdered: boolean;

  @Column('boolean', { name: 'is_delivered', default: () => 'false' })
  isDelivered: boolean;

  @Column('boolean', { name: 'is_received', default: () => 'false' })
  isReceived: boolean;

  @Column('boolean', { name: 'is_refund_requested', default: () => 'false' })
  isRefundRequested: boolean;

  @Column('boolean', { name: 'is_refund_granted', default: () => 'false' })
  isRefundGranted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address;

  @ManyToOne(() => Coupon, (coupon) => coupon.orders)
  @JoinColumn([{ name: 'coupon_id', referencedColumnName: 'id' }])
  coupon: Coupon;

  @ManyToOne(() => Payment, (payment) => payment.orders)
  @JoinColumn([{ name: 'payment_id', referencedColumnName: 'id' }])
  payment: Payment;

  @ManyToOne(() => State, (state) => state.orders)
  @JoinColumn([{ name: 'state_id', referencedColumnName: 'id' }])
  state: State;

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order)
  orderProducts: OrderProducts[];

  @OneToMany(() => Refund, (refund) => refund.order)
  refunds: Refund[];
}
