import { Module } from '@nestjs/common';
import { MycourseService } from './mycourse.service';
import { MycourseController } from './mycourse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/checkout/orderdeatil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [MycourseController],
  providers: [MycourseService]
})
export class MycourseModule {}
