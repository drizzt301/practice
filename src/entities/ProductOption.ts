import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderOption } from './OrderOption';
import { Product } from './Product';

@Index('product_option_pkey', ['id'], { unique: true })
@Entity('product_option', { schema: 'public' })
export class ProductOption {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('integer', { name: 'price', default: () => '0' })
  price: number;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 100,
  })
  description: string | null;

  @Column('character varying', { name: 'image', nullable: true, length: 250 })
  image: string | null;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @OneToMany(() => OrderOption, (orderOption) => orderOption.option)
  orderOptions: OrderOption[];

  @OneToMany(() => OrderOption, (orderOption) => orderOption.option2)
  orderOptions2: OrderOption[];

  @OneToMany(() => OrderOption, (orderOption) => orderOption.option3)
  orderOptions3: OrderOption[];

  @OneToMany(() => OrderOption, (orderOption) => orderOption.option4)
  orderOptions4: OrderOption[];

  @OneToMany(() => OrderOption, (orderOption) => orderOption.option5)
  orderOptions5: OrderOption[];

  @ManyToOne(
    () => ProductOption,
    (productOption) => productOption.productOptions,
  )
  @JoinColumn([{ name: 'parent_option_id', referencedColumnName: 'id' }])
  parentOption: ProductOption;

  @OneToMany(() => ProductOption, (productOption) => productOption.parentOption)
  productOptions: ProductOption[];

  @ManyToOne(() => Product, (product) => product.productOptions)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
