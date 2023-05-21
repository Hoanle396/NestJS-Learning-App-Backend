import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from 'src/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from 'src/entities/rate.entity';
import { Trending } from 'src/entities/trending.entity';
import { CourseDetail } from 'src/entities/coursedetail.entity';
import { OrderDetail } from 'src/entities/checkout/orderdeatil.entity';
import { PythonService } from './system.python.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      Course,
      Rate,
      Trending,
      CourseDetail,
      OrderDetail,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, PythonService],
})
export class CourseModule {}
