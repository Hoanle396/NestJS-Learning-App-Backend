import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { User } from 'src/entities/user.entity';
import { Cash } from 'src/entities/wallet/cash.entity';
import { OrderDetail } from 'src/entities/checkout/orderdeatil.entity';
import { Order } from 'src/entities/checkout/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course,User,Cash,OrderDetail,Order])],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
