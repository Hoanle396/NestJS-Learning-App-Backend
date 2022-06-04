import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateWalletDto {
   @IsString()
   @IsNotEmpty()
   email: string;
   
   @IsNotEmpty()
   @IsInt()
   @Type(() => Number)
   amount: number;
   
   message: string;
}
