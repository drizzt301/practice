import { BadRequestException, PipeTransform } from '@nestjs/common';
import { OrderStatus } from '../order-status.enum';

export class OrderStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [OrderStatus.PRIVATE, OrderStatus.PUBLIC];

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
