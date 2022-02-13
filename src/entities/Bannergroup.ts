import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Banner } from './Banner';

@Index('bannergroup_pkey', ['id'], { unique: true })
@Entity('bannergroup', { schema: 'public' })
export class Bannergroup {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('boolean', { name: 'is_visible', default: () => 'true' })
  isVisible: boolean;

  @OneToMany(() => Banner, (banner) => banner.group)
  banners: Banner[];
}
