import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Socialaccount } from './Socialaccount';

@Index('socialtoken_pkey', ['id'], { unique: true })
@Entity('socialtoken', { schema: 'public' })
export class Socialtoken {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'token' })
  token: string;

  @Column('text', { name: 'token_secret' })
  tokenSecret: string;

  @Column('timestamp without time zone', { name: 'expires_at', nullable: true })
  expiresAt: Date | null;

  @ManyToOne(() => Socialaccount, (socialaccount) => socialaccount.socialtokens)
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Socialaccount;
}
