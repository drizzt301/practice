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

@Index('content_qna_pkey', ['id'], { unique: true })
@Entity('content_qna', { schema: 'public' })
export class ContentQna {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', length: 100 })
  title: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column('character varying', { name: 'image', length: 250 })
  image: string;

  @Column('integer', { name: 'step' })
  step: number;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @Column('integer', { name: 'users_id' })
  usersId: number;

  @Column('integer', { name: 'product_id' })
  productId: number;

  @CreateDateColumn()
  createdAt: Date | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdBy: number | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @Column('integer', { name: 'updated_by', nullable: true })
  updatedBy: number | null;

  @ManyToOne(() => ContentQna, (contentQna) => contentQna.contentQnas)
  @JoinColumn([{ name: 'parent_qna_id', referencedColumnName: 'id' }])
  parentQna: ContentQna;

  @OneToMany(() => ContentQna, (contentQna) => contentQna.parentQna)
  contentQnas: ContentQna[];
}
