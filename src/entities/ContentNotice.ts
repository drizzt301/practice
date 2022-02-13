import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('content_notice_pkey', ['id'], { unique: true })
@Entity('content_notice', { schema: 'public' })
export class ContentNotice {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 100 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('character varying', { name: 'image', length: 250 })
  image: string;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @Column('integer', { name: 'users_id' })
  usersId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;
}
