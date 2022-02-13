import { Coupon } from 'src/entities/Coupon';
import { Users } from 'src/entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { CouponStatus } from './coupon-status.enum';
import { CreateCouponDto } from './dto/create-coupon.dto';

@EntityRepository(Coupon)
export class CouponRepository extends Repository<Coupon> {
  async createCoupon(
    createCouponDto: CreateCouponDto,
    //user: Users,
  ): Promise<Coupon> {
    const { code, name } = createCouponDto;

    const coupon = this.create({
      code,
      name,
      //status: CouponStatus.PUBLIC,
      //user,
    });

    await this.save(coupon);
    return coupon;
  }
}
