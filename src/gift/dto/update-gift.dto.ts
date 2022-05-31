import { PartialType } from '@nestjs/mapped-types';
import { CreateGiftDto } from './create-gift.dto';

export class UpdateGiftDto extends PartialType(CreateGiftDto) {}
