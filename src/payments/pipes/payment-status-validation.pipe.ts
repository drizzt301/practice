import { BadRequestException, PipeTransform } from '@nestjs/common';
import { PaymentStatus } from '../payment-status.enum';

export class PaymentStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [PaymentStatus.PRIVATE, PaymentStatus.PUBLIC];

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
