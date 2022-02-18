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
/*
  transform 유저가 보낸 데이터를 우리가 원하는 실제 타입으로 변환
  whitelist 엉뚱한값,객체를 보내오면 필터링 -main.ts Global Validation
  forbidNonWhitelist whitelist와 유사 처리??? -main.ts Global Validation
*/
