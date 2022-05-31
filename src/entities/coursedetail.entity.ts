import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm'
import { Course } from './course.entity';

@Entity('coursedetails')
export class CourseDetail{
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   numerical:number;
   
   @Column({nullable:true})
   description: string;

   @Column({nullable:false})
   lessonUrl: string;

   @ManyToOne(()=>Course, course=>course.detail)
   lesson : Course;
}