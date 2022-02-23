import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly streetAddress: string;

  @IsNotEmpty()
  @IsString()
  readonly apartmentAddress: string;

  @IsString()
  readonly etc: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly zip: string;
}

/* 글자수 지정도 가능*/
