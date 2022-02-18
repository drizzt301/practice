import { CreateBannerDto } from './../dto/create-banner.dto';
import { BadRequestException, PipeTransform } from '@nestjs/common';

export class BannerCreateValidationPipe implements PipeTransform {
  transform(value: CreateBannerDto) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = 1;
    return index;
  }
}
