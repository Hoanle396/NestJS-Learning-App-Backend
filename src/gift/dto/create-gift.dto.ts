import { IsDate, IsNotEmpty, IsString } from 'class-validator';
export class CreateGiftDto {
  @IsNotEmpty()
  @IsString()
  giftcode: string;

  @IsNotEmpty()
  @IsString()
  sale: number;
  
  @IsNotEmpty()
  startDate: Date;
  
  @IsNotEmpty()
  endDate: Date;
}
