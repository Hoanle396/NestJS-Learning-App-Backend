import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/checkout/order.entity';
import { OrderDetail } from 'src/entities/checkout/orderdeatil.entity';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { Cash } from 'src/entities/wallet/cash.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { OrderDto } from './dto/order-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Cash) private cash: Repository<Cash>,
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(OrderDetail) private orderDetail: Repository<OrderDetail>,
    @InjectRepository(Course) private courseRep: Repository<Course>,
  ) {}
  async buyCourse(
    orderDto: OrderDto,
    user: User,
    wallet: number,
  ): Promise<any> {
    try {
      const order = new Order();
      const course = await this.courseRep.findOne({
        where: { id: orderDto.course },
      });
      const orderDetail = new OrderDetail();
      orderDetail.fee = orderDto.fee;
      orderDetail.course = course;
      orderDetail.order = order;
      orderDetail.user = user;
      await this.order.save(order);
      await this.orderDetail.save(orderDetail);
      await this.cash.insert({
        user: user,
        before: user.money,
        after: wallet,
        amount: orderDto.fee,
        note: 'Buy Course',
      });
      await this.user.update(user.id, { money: wallet });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async transfer(wallet: CreateWalletDto, user: User, after: number) {
    try {
      const given = await this.user.findOne({ where: { email: wallet.email } });
      await this.cash.insert({
        user: given,
        before: given.money,
        after: (given.money + wallet.amount),
        amount: wallet.amount,
        note: wallet.message,
      });
      await this.cash.insert({
        user: user,
        before: user.money,
        after: after,
        amount: wallet.amount,
        note: wallet.message,
      });
      const newmoney=given.money + Number(wallet.amount);
      await this.user.update(given.id, { money: newmoney});
      await this.user.update(user.id, { money: after });
      return true;
    } catch {
      return false;
    }
  }
}
