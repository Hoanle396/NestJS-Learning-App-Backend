import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CourseDetail } from './coursedetail.entity';
import { Rate } from './rate.entity';
import { Trending } from './trending.entity';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  discount:number;

  @Column()
  background: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Rate)
  @JoinColumn()
  rate: Rate;
  
  @OneToOne(() =>Trending)
  @JoinColumn()
  trending : Trending;

  @OneToMany(() => CourseDetail, (cd) => cd.lesson)
  @JoinColumn()
  detail: CourseDetail[];
}
