import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class RechargeDto{


   note!: string;
   @IsNotEmpty()
   @IsInt()
   @Type(() => Number)
   amount: number;
}