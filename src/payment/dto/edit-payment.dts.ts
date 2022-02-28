import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditPaymentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
