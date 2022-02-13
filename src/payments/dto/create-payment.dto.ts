import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  stripeChargeId: string;

  @IsNotEmpty()
  amount: number;
}
