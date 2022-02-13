import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewImage } from './ReviewImage';

@Index('review_pkey', ['id'], { unique: true })
@Entity('review', { schema: 'public' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 100 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('integer', { name: 'grade', default: () => '5' })
  grade: number;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @Column('integer', { name: 'users_id' })
  usersId: number;

  @Column('integer', { name: 'product_id' })
  productId: number;

  @Column('integer', { name: 'order_id' })
  orderId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.review)
  reviewImages: ReviewImage[];
}
