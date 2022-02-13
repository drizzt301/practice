import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/Coupon';
import { CouponRepository } from './coupon.repository';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(CouponRepository)
    private couponRepository: CouponRepository,
  ) {}

  async getAllCoupons(): Promise<Coupon[]> {
    const query = this.couponRepository.createQueryBuilder('coupon');
    //query.where('board.userId = :userId', { userId: user.id });
    const coupons = await query.getMany();

    return coupons;
  }

  createCoupon(createCouponDto: CreateCouponDto): Promise<Coupon> {
    // , user: User
    return this.couponRepository.createCoupon(createCouponDto); // , user
  }

  async getCouponById(id: number): Promise<Coupon> {
    const found = await this.couponRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Coupon with id ${id}`);
    }

    return found;
  }

  async deleteCoupon(id: number): Promise<void> {
    // , user: User
    const result = await this.couponRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Coupon with id ${id}`);
    }
  }

  async updateBoardStatus(id: number): Promise<Coupon> {
    //, status: CouponStatus
    const coupon = await this.getCouponById(id);

    //coupon.status = status;
    await this.couponRepository.save(coupon);

    return coupon;
  }
}
