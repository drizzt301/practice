import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProductStatus } from '../product-status.enum';

export class ProductStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [ProductStatus.PRIVATE, ProductStatus.PUBLIC];

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
