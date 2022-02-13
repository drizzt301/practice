import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';

@Index('state_pkey', ['id'], { unique: true })
@Entity('state', { schema: 'public' })
export class State {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 16 })
  name: string;

  @OneToMany(() => Order, (order) => order.state)
  orders: Order[];
}
