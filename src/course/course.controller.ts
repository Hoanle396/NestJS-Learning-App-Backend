import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/role/role.enum';
import RoleGuard from 'src/role/roles.guard';
import { course } from 'src/utils/upload';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { creatLessionDto } from './dto/create-lession.dto';
import { RewriteUrl } from './dto/rewrite-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Post()
  @UseInterceptors(FileInterceptor('files', { storage: course }))
  create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createCourseDto.image =
      process.env.APP_HOST + 'uploads/course/' + file.filename;

    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Get('/search/:search')
  async search(@Param('search') search: string) {
    return await this.courseService.find(search);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Delete('detail/:id')
  removelession(@Param('id') id: string) {
    return this.courseService.removeless(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.Admin))
  @Post('lession')
  createlession(@Body() creatLessionDto: creatLessionDto) {
    return this.courseService.createlession(creatLessionDto);
  }

  @Post('rewrite')
  rewriteUrl(@Body() url: RewriteUrl) {
    return this.courseService.rewriteUrl(url.current, url.url);
  }
}
