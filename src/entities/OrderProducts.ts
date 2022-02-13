import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';
import { OrderOption } from './OrderOption';

@Index('order_products_pkey', ['id'], { unique: true })
@Entity('order_products', { schema: 'public' })
export class OrderProducts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Order;

  @ManyToOne(() => OrderOption, (orderOption) => orderOption.orderProducts)
  @JoinColumn([{ name: 'order_option_id', referencedColumnName: 'id' }])
  orderOption: OrderOption;
}
