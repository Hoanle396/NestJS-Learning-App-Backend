import { Type } from 'class-transformer';
import {IsInt, IsNotEmpty ,  IsString} from 'class-validator'
export class CreateCourseDto {
   @IsNotEmpty()
   @IsString()
   title: string;

   @IsNotEmpty()
   @IsString()
   description: string;

   @IsNotEmpty()
   @IsString()
   background: string;  

   @IsNotEmpty()
   @IsInt()
   @Type(() => Number)
   discount: number;  

   image: string;
   rate;
   trending;
   detail;
}
