import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BannerStatus } from '../banner-status.enum';

export class BannerStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BannerStatus.PRIVATE, BannerStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
