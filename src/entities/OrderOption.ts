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
import { ProductOption } from './ProductOption';
import { Product } from './Product';
import { Users } from './Users';
import { OrderProducts } from './OrderProducts';

@Index('order_option_pkey', ['id'], { unique: true })
@Entity('order_option', { schema: 'public' })
export class OrderOption {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('boolean', { name: 'ordered' })
  ordered: boolean;

  @Column('integer', { name: 'quantity' })
  quantity: number;

  @Column('integer', { name: 'price_sum', default: () => '0' })
  priceSum: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => ProductOption, (productOption) => productOption.orderOptions)
  @JoinColumn([{ name: 'option1', referencedColumnName: 'id' }])
  option: ProductOption;

  @ManyToOne(
    () => ProductOption,
    (productOption) => productOption.orderOptions2,
  )
  @JoinColumn([{ name: 'option2', referencedColumnName: 'id' }])
  option2: ProductOption;

  @ManyToOne(
    () => ProductOption,
    (productOption) => productOption.orderOptions3,
  )
  @JoinColumn([{ name: 'option3', referencedColumnName: 'id' }])
  option3: ProductOption;

  @ManyToOne(
    () => ProductOption,
    (productOption) => productOption.orderOptions4,
  )
  @JoinColumn([{ name: 'option4', referencedColumnName: 'id' }])
  option4: ProductOption;

  @ManyToOne(
    () => ProductOption,
    (productOption) => productOption.orderOptions5,
  )
  @JoinColumn([{ name: 'option5', referencedColumnName: 'id' }])
  option5: ProductOption;

  @ManyToOne(() => Product, (product) => product.orderOptions)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Users, (users) => users.orderOptions)
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.orderOption)
  orderProducts: OrderProducts[];
}
