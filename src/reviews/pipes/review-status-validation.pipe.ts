import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ReviewStatus } from '../review-status.enum';

export class ReviewStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [ReviewStatus.PRIVATE, ReviewStatus.PUBLIC];

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
