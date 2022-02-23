import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/Coupon';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  findAll(): Promise<Coupon[]> {
    return this.couponRepository.find();
  }

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    // , user: User
    const { code, name } = createCouponDto;
    const coupon = this.couponRepository.create({
      code,
      name,
    });
    await this.couponRepository.save(coupon);
    return coupon;
  }

  async findOne(id: number): Promise<Coupon> {
    const found = await this.couponRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find Coupon with id ${id}`);
    }

    return found;
  }

  async delete(id: number): Promise<void> {
    // , user: User
    const result = await this.couponRepository.delete({ id }); // , user

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Coupon with id ${id}`);
    }
  }

  async update(id: number, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    const coupon = await this.findOne(id);

    console.log(typeof id);

    const { code, name } = updateCouponDto;
    coupon.code = code;
    coupon.name = name;

    await this.couponRepository.save(coupon);
    return coupon;
  }
}
