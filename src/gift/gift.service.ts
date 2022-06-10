import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftVoucher } from 'src/entities/giftvoucher.entity';
import { Repository } from 'typeorm';
import { CheckGift } from './dto/check-gift.dto';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(GiftVoucher) private giftRep: Repository<GiftVoucher>,
  ) {}
  async create(createGiftDto: CreateGiftDto) {
    createGiftDto.startDate = new Date(createGiftDto.startDate);
    createGiftDto.endDate = new Date(createGiftDto.endDate);
    return await this.giftRep.save(createGiftDto);
  }
  async gift(body: CheckGift): Promise<GiftVoucher> {
    return await this.giftRep.findOne({ where: { giftcode: body.giftcode } });
  }
  async findAll() {
    return await this.giftRep.find();
  }

  async remove(id: number) {
    return await this.giftRep.delete(id);
  }
  async findWork(){
    const now = new Date();
    const data= await this.giftRep.createQueryBuilder('giftvoucher').where("giftvoucher.startDate < :now and giftvoucher.endDate > :now", { now: now }) .getMany();
    return data
  }
}
