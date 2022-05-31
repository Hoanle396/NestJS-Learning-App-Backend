import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { Course } from './entities/course.entity';
import { CourseDetail } from './entities/coursedetail.entity';
import { Comment } from './entities/comment.entity';
import { Rate } from './entities/rate.entity';
import { Trending } from './entities/trending.entity';
import { CourseModule } from './course/course.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WalletModule } from './wallet/wallet.module';
import { MycourseModule } from './mycourse/mycourse.module';
import { GiftModule } from './gift/gift.module';
import { GiftVoucher } from './entities/giftvoucher.entity';
import { Withdraw } from './entities/wallet/withdraw.entity';
import { Recharge } from './entities/wallet/recharge.entity';
import { Transfer } from './entities/wallet/transfer.entity';
import { Cash } from './entities/wallet/cash.entity';
import { Bank } from './entities/wallet/bank.entity';
import { Order } from './entities/checkout/order.entity';
import { OrderDetail } from './entities/checkout/orderdeatil.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }
  ),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    entities: [User,Course,CourseDetail,Comment,Rate,Trending,Withdraw,Recharge,Transfer,Cash,Bank,Order,OrderDetail],
    synchronize: true,
    autoLoadEntities:true
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '/public'),
  }),
  AuthModule,UserModule, CourseModule, WalletModule, MycourseModule, GiftModule],
  controllers: [AppController,UserController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}