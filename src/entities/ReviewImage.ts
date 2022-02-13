import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './Review';

@Index('review_image_pkey', ['id'], { unique: true })
@Entity('review_image', { schema: 'public' })
export class ReviewImage {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'image', length: 250 })
  image: string;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => Review, (review) => review.reviewImages)
  @JoinColumn([{ name: 'review_id', referencedColumnName: 'id' }])
  review: Review;
}
