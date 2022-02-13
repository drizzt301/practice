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
import { OrderOption } from './OrderOption';
import { Category } from './Category';
import { ProductImage } from './ProductImage';
import { ProductOption } from './ProductOption';

@Index('product_pkey', ['id'], { unique: true })
@Entity('product', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('integer', { name: 'price', default: () => '0' })
  price: number;

  @Column('integer', { name: 'discount_price', default: () => '0' })
  discountPrice: number;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('character varying', { name: 'thumbnail', length: 250 })
  thumbnail: string;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @Column('boolean', { name: 'is_order', default: () => 'true' })
  isOrder: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @OneToMany(() => OrderOption, (orderOption) => orderOption.product)
  orderOptions: OrderOption[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @OneToMany(() => ProductOption, (productOption) => productOption.product)
  productOptions: ProductOption[];
}
