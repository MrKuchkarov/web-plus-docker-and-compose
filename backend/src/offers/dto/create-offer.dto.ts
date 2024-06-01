import { IsBoolean, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOfferDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsBoolean()
  @IsOptional()
  hidden: boolean;

  @IsNumber()
  itemId: number;
}
