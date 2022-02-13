import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';

@Index('emailconfirm_pkey', ['id'], { unique: true })
@Entity('emailconfirm', { schema: 'public' })
export class Emailconfirm {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @CreateDateColumn()
  created: Date;

  @Column('timestamp without time zone', { name: 'sent', nullable: true })
  sent: Date | null;

  @Column('character varying', { name: 'key', length: 200 })
  key: string;

  @ManyToOne(() => Users, (users) => users.emailconfirms)
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;
}
