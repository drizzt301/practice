import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticeDto {
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
