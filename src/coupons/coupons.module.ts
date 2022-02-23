import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/Coupon';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon]),
    // AuthModule
  ],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
