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
import { RechargeDto } from './dto/recharge-wallet.dto';
import * as md5 from 'md5';
import { Recharge } from 'src/entities/wallet/recharge.entity';
@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Cash) private cash: Repository<Cash>,
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(OrderDetail) private orderDetail: Repository<OrderDetail>,
    @InjectRepository(Course) private courseRep: Repository<Course>,
    @InjectRepository(Recharge) private charge: Repository<Recharge>,
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
        after: given.money + wallet.amount,
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
      const newmoney = given.money + Number(wallet.amount);
      await this.user.update(given.id, { money: newmoney });
      await this.user.update(user.id, { money: after });
      return true;
    } catch {
      return false;
    }
  }
  async recharge(recharge: RechargeDto, user: User) {
    let v1 = md5(new Date().getTime().toLocaleString()).substring(0, 8);
    const rechargeDto = new Recharge();
    rechargeDto.amount = recharge.amount;
    rechargeDto.uuid = v1;
    rechargeDto.note = recharge.note;
    rechargeDto.user = user;
    return this.charge.save(rechargeDto);
  }

  async all(): Promise<Recharge[]> {
    return await this.charge.find({ relations: { user: true } });
  }

  async pedding(): Promise<Recharge[]> {
    return await this.charge.find({
      where: { status: 'pending' },
      relations: { user: true },
    });
  }
  async check(id: number): Promise<Recharge> {
    return await this.charge.findOne({
      where: { id: id },
      relations: { user: true },
    });
  }
  async accept(pending: Recharge) {
    try {
      await this.cash.insert({
        user: pending.user,
        before: pending.user.money,
        after: Number(pending.user.money) + Number(pending.amount),
        amount: pending.amount,
        note: 'Recharge',
      });
      await this.user.update(pending.user.id, {
        money: Number(pending.user.money) + Number(pending.amount),
      });
      await this.charge.update(pending.id, { status: 'success' });
      return true;
    } catch {
      return false;
    }
  }
  async getHistory(user: User){
    return await this.cash.createQueryBuilder('cash').where("cash.userId = :id", { id: user.id }).getMany();
  }
}
