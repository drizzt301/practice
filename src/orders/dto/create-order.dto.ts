import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  // @IsNotEmpty()
  // id: number;

  // @IsNotEmpty()
  // createdAt: Date;

  // @IsNotEmpty()
  // state: number;

  // @IsNotEmpty()
  // users: number;

  @IsBoolean()
  readonly isOrdered: boolean;
}
