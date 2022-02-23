import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Coupon } from 'src/entities/Coupon';
import { Users } from 'src/entities/Users';
import { CouponStatus } from './coupon-status.enum';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponsController {
  private logger = new Logger('Coupons');
  constructor(private couponsService: CouponsService) {}

  @Get()
  findAll(): Promise<Coupon[]> {
    this.logger.verbose(`User trying to get all coupons`);
    return this.couponsService.findAll();
  }

  @Post()
  createCoupon(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new coupon. 
      Payload: ${JSON.stringify(createCouponDto)} `); // ${user.username}
    return this.couponsService.create(createCouponDto); //, user
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Coupon> {
    return this.couponsService.findOne(id);
  }

  @Delete('/:id')
  delete(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.couponsService.delete(id); // , user
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCouponDto: UpdateCouponDto,
  ): Promise<Coupon> {
    return this.couponsService.update(id, updateCouponDto);
    // , status
  }
}

/*
  @Get()
  getAllBoard(@GetUser() user: Users): Promise<Coupon[]> {
    this.logger.verbose(
      `User ${user.firstName} ${user.lastName} trying to get all coupons`,
    );
    return this.boardsService.getAllCoupons(user);
  }
*/
