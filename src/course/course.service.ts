import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, switchMap } from 'rxjs';
import { OrderDetail } from 'src/entities/checkout/orderdeatil.entity';
import { Course } from 'src/entities/course.entity';
import { CourseDetail } from 'src/entities/coursedetail.entity';
import { Rate } from 'src/entities/rate.entity';
import { Trending } from 'src/entities/trending.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { creatLessionDto } from './dto/create-lession.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

interface Count extends OrderDetail {
  count: number;
}
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    @InjectRepository(Rate) private rateRepository: Repository<Trending>,
    @InjectRepository(Trending)
    private trendingRepository: Repository<Trending>,
    @InjectRepository(CourseDetail)
    private detailRepository: Repository<CourseDetail>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}
  create(createCourseDto: CreateCourseDto) {
    const rate = new Rate();
    const trending = new Trending();
    createCourseDto.rate = rate;
    createCourseDto.trending = trending;
    return from(this.rateRepository.insert(rate)).pipe(
      switchMap(() =>
        from(this.trendingRepository.insert(trending)).pipe(
          switchMap(() => this.courseRepository.insert(createCourseDto)),
        ),
      ),
    );
    // return this.courseRepository.insert(createCourseDto)
  }

  async findAll(): Promise<Course[]> {
    const course = await this.courseRepository.find();
    const recommendCourse = this.recommendCourse(course);

    const time = new Date();
    let result = [];
    for (let a of recommendCourse) {
      let onec = await this.orderDetailRepository
        .createQueryBuilder('orderdetails')
        .where('orderdetails.course=:id', { id: a.id })
        .getCount();
      let b = (onec * 3600000) / (time.getTime() - a.createdAt.getTime());
      let c = { ...a, count: b };
      result.push(c);
    }
    return result.sort((a, b) => b.count - a.count);
  }
  
  recommendCourse(course) {
    const shuffledProducts = course.sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, 10);
  }

  async find(search: string): Promise<Course[]> {
    return await this.courseRepository
      .createQueryBuilder('course')
      .where('course.title LIKE :search OR course.description LIKE :search', {
        search: `%${search}%`,
      })
      .getMany();
  }

  async findOne(id: number): Promise<Course> {
    return await this.courseRepository.findOne({
      where: { id: id },
      relations: {
        rate: true,
        trending: true,
        detail: true,
      },
      order: {
        detail: {
          id: 'ASC',
        },
      },
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto);
  }

  async remove(id: number) {
    return await this.courseRepository.delete(id);
  }

  async removeless(id: number) {
    return await this.detailRepository.delete(id);
  }
  async createlession(creatLessionDto: creatLessionDto) {
    return await this.detailRepository.insert(creatLessionDto);
  }
}
