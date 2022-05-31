import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftVoucher } from 'src/entities/giftvoucher.entity';
import { Repository } from 'typeorm';
import { CheckGift } from './dto/check-gift.dto';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

@Injectable()
export class GiftService {
  constructor(@InjectRepository(GiftVoucher) private giftRep:Repository<GiftVoucher>){

  }
  create(createGiftDto: CreateGiftDto) {
    return 'This action adds a new gift';
  }
  async gift(body:CheckGift): Promise<GiftVoucher>{
    return  await this.giftRep.findOne({where:{giftcode:body.giftcode}})
  }
  findAll() {
    return `This action returns all gift`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gift`;
  }

  update(id: number, updateGiftDto: UpdateGiftDto) {
    return `This action updates a #${id} gift`;
  }

  remove(id: number) {
    return `This action removes a #${id} gift`;
  }
}
