import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './Address';
import { Coupon } from './Coupon';
import { Emailconfirm } from './Emailconfirm';
import { Order } from './Order';
import { OrderOption } from './OrderOption';
import { Payment } from './Payment';
import { Socialaccount } from './Socialaccount';

@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'password', length: 200 })
  password: string;

  @Column('character varying', { name: 'nickname', length: 50 })
  nickname: string;

  @Column('character varying', {
    name: 'last_name',
    nullable: true,
    length: 50,
  })
  lastName: string | null;

  @Column('character varying', {
    name: 'first_name',
    nullable: true,
    length: 50,
  })
  firstName: string | null;

  @Column('character varying', { name: 'email', length: 250 })
  email: string;

  @Column('smallint', { name: 'role' })
  role: number;

  @Column('boolean', { name: 'is_active', default: () => 'true' })
  isActive: boolean;

  @Column('timestamp without time zone', { name: 'last_login', nullable: true })
  lastLogin: Date | null;

  @Column('timestamp without time zone', { name: 'date_joined' })
  dateJoined: Date;

  @Column('character varying', {
    name: 'phone',
    nullable: true,
    length: 11,
  })
  phone: string | null;

  @Column('smallint', { name: 'age', nullable: true })
  age: number | null;

  @Column('character varying', { name: 'birth', nullable: true, length: 10 })
  birth: string | null;

  @Column('smallint', { name: 'gender', nullable: true })
  gender: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @Column('boolean', { name: 'is_confirmed', default: () => 'false' })
  isConfirmed: boolean;

  @OneToMany(() => Address, (address) => address.users)
  addresses: Address[];

  @OneToMany(() => Coupon, (coupon) => coupon.users)
  coupons: Coupon[];

  @OneToMany(() => Emailconfirm, (emailconfirm) => emailconfirm.users)
  emailconfirms: Emailconfirm[];

  @OneToMany(() => Order, (order) => order.users)
  orders: Order[];

  @OneToMany(() => OrderOption, (orderOption) => orderOption.users)
  orderOptions: OrderOption[];

  @OneToMany(() => Payment, (payment) => payment.users)
  payments: Payment[];

  @OneToMany(() => Socialaccount, (socialaccount) => socialaccount.users)
  socialaccounts: Socialaccount[];
}
