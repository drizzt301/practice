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

@Index('address_pkey', ['id'], { unique: true })
@Entity('address', { schema: 'public' })
export class Address {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'street_address', length: 200 })
  streetAddress: string;

  @Column('character varying', { name: 'apartment_address', length: 200 })
  apartmentAddress: string;

  @Column('character varying', { name: 'etc_address', length: 200 })
  etc: string;

  @Column('character varying', {
    name: 'country',
    length: 2,
    default: () => "'KR'",
  })
  country: string;

  @Column('character varying', { name: 'name_recieve', length: 50 })
  name: string;

  @Column('character varying', { name: 'zip', length: 5 })
  zip: string;

  @Column('character varying', {
    name: 'phone',
    nullable: true,
    length: 11,
  })
  phone: string | null;

  @Column('boolean', { name: 'is_default', default: () => 'false' })
  isDefault: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => Users, (users) => users.addresses)
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => Order, (order) => order.address)
  orders: Order[];
}
