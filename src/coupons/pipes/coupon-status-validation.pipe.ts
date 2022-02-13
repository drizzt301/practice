import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CouponStatus } from '../coupon-status.enum';

export class CouponStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [CouponStatus.PRIVATE, CouponStatus.PUBLIC];

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
