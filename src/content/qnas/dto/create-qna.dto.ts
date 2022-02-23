import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQnaDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;
}

/*
  @IsNumber
  @IsOptional
*/
