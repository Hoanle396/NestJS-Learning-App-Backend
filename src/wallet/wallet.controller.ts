import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus, Res } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';
import { OrderDto } from './dto/order-wallet.dto';
import { Response } from 'express';

@Controller('api/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.User))
  @Post()
  async checkout(@Body() orderDto: OrderDto,@Request() req,@Res() res:Response) {
    const wallet=req.user.money-orderDto.fee
    if(wallet<=0){
      return res.status(HttpStatus.BAD_REQUEST).json({statusCode: 400,message:"Insufficient balance. Please add more money to your wallet"})
    }
    else{
      const result = await this.walletService.buyCourse(orderDto,req.user,wallet)
      if(result){
       return res.status(HttpStatus.OK).json({statusCode: 200,message:"Success to buy the course"})
      }
      else {
        return res.status(HttpStatus.FAILED_DEPENDENCY).json({statusCode: 424,message:"Fail to buy the course"})
      }
    }
  }
}
