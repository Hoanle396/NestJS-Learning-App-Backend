import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { Cash } from 'src/entities/wallet/cash.entity';
import { OrderDetail } from 'src/entities/checkout/orderdeatil.entity';
import { Order } from 'src/entities/checkout/order.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Recharge } from 'src/entities/wallet/recharge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,User,Cash,OrderDetail,Order,Recharge])],
  controllers: [WalletController],
  providers: [WalletService,UserService,JwtService]
})
export class WalletModule {}
