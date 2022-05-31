import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/checkout/order.entity';
import { OrderDetail } from 'src/entities/checkout/orderdeatil.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMycourseDto } from './dto/create-mycourse.dto';
import { UpdateMycourseDto } from './dto/update-mycourse.dto';

@Injectable()
export class MycourseService {
   constructor(@InjectRepository(OrderDetail) private course:Repository<OrderDetail>){}

    async getmycourse(users:User){
      // return await this.course.find({where:{user:users},relations:{course:true}})
      return await this.course.createQueryBuilder("orderdeatils").leftJoinAndSelect('orderdeatils.course','course').where("orderdeatils.user = :id", { id: users.id }) .getMany();
    } 
}
