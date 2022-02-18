import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bannergroup } from './Bannergroup';

@Index('banner_pkey', ['id'], { unique: true })
@Entity('banner', { schema: 'public' })
export class Banner {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'image', length: 250 })
  image: string;

  // @Column('character varying', { name: 'test', length: 100 })
  // test: string;
  @Column('character varying', {
    name: 'name',
    nullable: true,
    length: 50,
    unique: true,
  })
  name: string | null;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 100,
  })
  description: string | null;

  @Column('character varying', { name: 'link', nullable: true, length: 250 })
  link: string | null;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @ManyToOne(() => Bannergroup, (bannergroup) => bannergroup.banners)
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Bannergroup;
}
