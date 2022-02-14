import { CouponRepository } from './coupon.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponRepository]),
    // AuthModule
  ],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
