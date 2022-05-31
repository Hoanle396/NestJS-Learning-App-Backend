import { Module } from '@nestjs/common';
import { GiftService } from './gift.service';
import { GiftController } from './gift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftVoucher } from 'src/entities/giftvoucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftVoucher])],
  controllers: [GiftController],
  providers: [GiftService]
})
export class GiftModule {}
