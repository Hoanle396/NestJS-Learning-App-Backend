import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Res, HttpStatus } from '@nestjs/common';
import { GiftService } from './gift.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { CheckGift } from './dto/check-gift.dto';
import { Response } from 'express';

@Controller('api/gift')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Post()
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftService.create(createGiftDto);
  }

  @Get()
  findAll() {
    return this.giftService.findAll();
  }

  @Post('check')
  async gift(@Body() checkGiftDto: CheckGift,@Res() res:Response) {
    const data= await this.giftService.gift(checkGiftDto)
    if(!data){
      return res.status(HttpStatus.NOT_FOUND).json({message: "Gift not found"})
    }
    else{
      const date=new Date()
      if((data.startDate<=date)&&(date<=data.endDate)){
        return res.status(HttpStatus.OK).json({percent:data.sale,message:`${data.sale} percent of voucher`})
      }
      else{
        return res.status(HttpStatus.BAD_REQUEST).json({message:'voucher has not been applied'})
      }
    } 
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiftDto: UpdateGiftDto) {
    return this.giftService.update(+id, updateGiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftService.remove(+id);
  }
}
