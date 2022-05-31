import { PartialType } from '@nestjs/mapped-types';
import { CreateMycourseDto } from './create-mycourse.dto';

export class UpdateMycourseDto extends PartialType(CreateMycourseDto) {}
