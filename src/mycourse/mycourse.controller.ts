import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MycourseService } from './mycourse.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RoleGuard from 'src/role/roles.guard';
import { Role } from 'src/role/role.enum';

@Controller('api/mycourse')
export class MycourseController {
  constructor(private readonly mycourseService: MycourseService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.User))
  async getmycourse(@Request() req,@Res() res) {
    const data = await this.mycourseService.getmycourse(req.user);
    if(data){
      return res.status(HttpStatus.OK).json(data);
    }
    else{
      return res.status(HttpStatus.NOT_FOUND).json({status: '404 Not Found',message: 'You not have any Course'})
    }
  }
}
