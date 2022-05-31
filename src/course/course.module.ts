import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from 'src/entities/rate.entity';
import { Trending } from 'src/entities/trending.entity';
import { CourseDetail } from 'src/entities/coursedetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,Rate,Trending,CourseDetail])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
