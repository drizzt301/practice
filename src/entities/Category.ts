import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('category_pkey', ['id'], { unique: true })
@Entity('category', { schema: 'public' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 100,
  })
  description: string | null;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @ManyToOne(() => Category, (category) => category.categories)
  @JoinColumn([{ name: 'parent_category_id', referencedColumnName: 'id' }])
  parentCategory: Category;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
