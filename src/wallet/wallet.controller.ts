import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';
import { OrderDto } from './dto/order-wallet.dto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { RechargeDto } from './dto/recharge-wallet.dto';

@Controller('api/wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private userService: UserService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('/cash')
  async getHistory(@Request() req, @Res() res: Response) {
    console.log(req);
    let data = await this.walletService.getHistory(req.user);
    data = data.sort((a, b) => b.id - a.id);
    return res.status(HttpStatus.OK).send(data);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.User))
  @Post()
  async checkout(
    @Body() orderDto: OrderDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOne(req.user.email);
    if (user.money <= 0 || user.money < orderDto.fee) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Insufficient balance. Please add more money to your wallet',
      });
    } else {
      const result = await this.walletService.buyCourse(
        orderDto,
        user,
        user.money - orderDto.fee,
      );
      if (result) {
        return res
          .status(HttpStatus.OK)
          .json({ statusCode: 200, message: 'Success to buy the course' });
      } else {
        return res
          .status(HttpStatus.FAILED_DEPENDENCY)
          .json({ statusCode: 424, message: 'Fail to buy the course' });
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.User))
  @Post('/transfer')
  async transfer(
    @Body() wallet: CreateWalletDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOne(req.user.email);
    if (user.money <= 0 || user.money < wallet.amount) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Insufficient balance. Please add more money to your wallet',
      });
    } else {
      const result = await this.walletService.transfer(
        wallet,
        user,
        user.money - wallet.amount,
      );
      if (result) {
        return res
          .status(HttpStatus.OK)
          .json({ statusCode: 200, message: 'Success to transfer' });
      } else {
        return res
          .status(HttpStatus.FAILED_DEPENDENCY)
          .json({ statusCode: 424, message: 'Fail to transfer' });
      }
    }
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.User))
  @Post('/recharge')
  async recharge(
    @Body() recharge: RechargeDto,
    @Request() req,
    @Res() res: Response,
  ) {
    const user = await this.userService.findOne(req.user.email);
    if (user) {
      const result = await this.walletService.recharge(recharge, req.user);
      if (result) {
        return res.status(HttpStatus.OK).json({ result: result });
      }
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Not Found User' });
    }
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Get()
  async wallet(@Res() res: Response) {
    const pending = await this.walletService.pedding();
    const recharge = await this.walletService.all();
    return res
      .status(HttpStatus.OK)
      .json({ pending: pending, recharge: recharge });
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Get('/:id')
  async accept(@Param('id') id: number, @Res() res: Response) {
    const pending = await this.walletService.check(id);
    if (pending.status != 'pending') {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: 400, message: 'Recharge not pending' });
    } else {
      const result = await this.walletService.accept(pending);
      if (result) {
        return res
          .status(HttpStatus.OK)
          .json({ status: 200, message: 'Activity Successful' });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ status: 400, message: 'Activity Failed' });
      }
    }
  }
}
