import { Type } from 'class-transformer';
import {IsInt, IsNotEmpty ,  IsString} from 'class-validator'
export class creatLessionDto{

   @IsNotEmpty()
   @IsString()
   description: string;

   @IsNotEmpty()
   @IsInt()
   @Type(() => Number)
   numerical: number;

   @IsNotEmpty()
   lesson
   
   @IsNotEmpty()
   @IsString()
   lessonUrl: string;


}