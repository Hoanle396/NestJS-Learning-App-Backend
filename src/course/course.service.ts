import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, switchMap } from 'rxjs';
import { Course } from 'src/entities/course.entity';
import { CourseDetail } from 'src/entities/coursedetail.entity';
import { Rate } from 'src/entities/rate.entity';
import { Trending } from 'src/entities/trending.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { creatLessionDto } from './dto/create-lession.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private courseRepository:Repository<Course>,
  @InjectRepository(Rate) private rateRepository:Repository<Trending>,
  @InjectRepository(Trending) private trendingRepository:Repository<Trending>,
  @InjectRepository(CourseDetail) private detailRepository:Repository<CourseDetail>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    const rate =new Rate()
    const trending =new Trending()
    createCourseDto.rate=rate
    createCourseDto.trending=trending
    return from(this.rateRepository.insert(rate))
    .pipe(
      switchMap(() => from(this.trendingRepository.insert(trending)).pipe(
        switchMap(() => this.courseRepository.insert(createCourseDto))
      )),
    )
    // return this.courseRepository.insert(createCourseDto)
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course>{
    return await this.courseRepository.findOne({where: {id: id},
      relations: {
          rate: true,
          trending:true,
          detail:true,
      }})
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto)
  }

  async remove(id: number) {
    return await this.courseRepository.delete(id);
  }

  async removeless(id: number){
    return await this.detailRepository.delete(id);
  }
  async createlession(creatLessionDto:creatLessionDto){
    return await this.detailRepository.insert(creatLessionDto);
  }
}
