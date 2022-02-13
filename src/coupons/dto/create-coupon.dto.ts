import { IsNotEmpty } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  name: string;
}
