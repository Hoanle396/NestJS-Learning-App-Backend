import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GiftService } from './gift.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { CheckGift } from './dto/check-gift.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';

@Controller('api/gift')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  async create(@Body() createGiftDto: CreateGiftDto) {
    console.log(createGiftDto);
    return await this.giftService.create(createGiftDto);
  }

  @Get()
  async findAll() {
    return await this.giftService.findAll();
  }

  @Post('check')
  async gift(@Body() checkGiftDto: CheckGift, @Res() res: Response) {
    const data = await this.giftService.gift(checkGiftDto);
    if (!data) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Gift not found' });
    } else {
      const date = new Date();
      if (data.startDate <= date && date <= data.endDate) {
        return res.status(HttpStatus.OK).json({
          percent: data.sale,
          message: `${data.sale} percent of voucher`,
        });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'voucher has not been applied' });
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.giftService.remove(+id);
  }

  @Get('/work')
  async getwork() {
    return await this.giftService.findWork();
  }
}
