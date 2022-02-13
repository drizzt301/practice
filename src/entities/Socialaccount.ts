import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { Socialtoken } from './Socialtoken';

@Index('socialaccount_pkey', ['id'], { unique: true })
@Entity('socialaccount', { schema: 'public' })
export class Socialaccount {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'provider', length: 30 })
  provider: string;

  @Column('character varying', { name: 'uid', length: 250 })
  uid: string;

  @Column('timestamp without time zone', { name: 'last_login' })
  lastLogin: Date;

  @Column('timestamp without time zone', { name: 'date_joined' })
  dateJoined: Date;

  @Column('text', { name: 'extra_data' })
  extraData: string;

  @ManyToOne(() => Users, (users) => users.socialaccounts)
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;

  @OneToMany(() => Socialtoken, (socialtoken) => socialtoken.account)
  socialtokens: Socialtoken[];
}
