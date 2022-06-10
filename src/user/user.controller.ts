import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Role } from 'src/role/role.enum';
import RoleGuard from 'src/role/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { UserService } from './user.service';

@Controller('api/auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/email/:email')
  async email(
    @Param('email') email: string,
    @Request() req,
    @Res() res: Response,
  ) {
    const data = await this.userService.findOne(email);
    if (!data) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: 404, message: 'Not Found user in email' });
    } else {
      const { password, ...user } = data;
      if (user.email == req.user.email) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: 400,
          message: "You can't transfer money to yourself",
        });
      } else {
        return res.status(HttpStatus.OK).json({ status: 200, user: user });
      }
    }
  }

  @Post('/login/google')
  async postLogin(@Body() createUserDto: GoogleUserDto, @Res() res: Response) {
    try {
      const data = await this.userService.logingoogle(createUserDto);
      if (data) {
        return res.status(HttpStatus.OK).send(data);
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Authorized !' });
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const data  = await this.userService.findOne(
      req.user.email,
    );
    if(data) {
      const { password, ...result}=data;
      return result;
    }
    return new UnauthorizedException(); 
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login/admin')
  async adlogin(@Request() req) {
    if (req.user.roles == 'admin') {
      return this.authService.login(req.user);
    } else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Get('/all')
  async getCustomer() {
    return await this.userService.findAll();
  }
}
