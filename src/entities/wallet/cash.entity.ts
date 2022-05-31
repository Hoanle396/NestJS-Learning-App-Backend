import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity('cash')
export class Cash {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  before: number;

  @Column()
  amount: number;

  @Column()
  after: number;

  @CreateDateColumn()
  time: Date;

  @Column({ nullable: true })
  note: string;
  
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
