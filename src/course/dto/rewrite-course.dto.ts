import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class RewriteUrl {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  current: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  url: string;
}
