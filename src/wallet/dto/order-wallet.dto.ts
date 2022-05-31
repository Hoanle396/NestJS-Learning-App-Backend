import { IsNotEmpty } from "class-validator";

export class OrderDto{
   @IsNotEmpty()
   course:number;
   @IsNotEmpty()
   fee:number;
}  