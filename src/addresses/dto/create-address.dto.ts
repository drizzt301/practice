import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  apartmentAddress: string;
}
