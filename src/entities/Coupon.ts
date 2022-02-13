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
import { Users } from './Users';
import { Order } from './Order';

@Index('coupon_pkey', ['id'], { unique: true })
@Entity('coupon', { schema: 'public' })
export class Coupon {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'code', length: 20 })
  code: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('integer', { name: 'amount', default: () => '0' })
  amount: number;

  @Column('boolean', { name: 'is_used', default: () => 'false' })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => Users, (users) => users.coupons)
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => Order, (order) => order.coupon)
  orders: Order[];
}
