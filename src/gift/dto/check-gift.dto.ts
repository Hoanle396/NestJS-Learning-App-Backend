import { IsNotEmpty, IsString } from "class-validator";

export class CheckGift{
   @IsString()
   @IsNotEmpty()
   giftcode:string;
}