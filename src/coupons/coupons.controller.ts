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
import { CouponStatusValidationPipe } from './pipes/coupon-status-validation.pipe';

@Controller('coupons')
export class CouponsController {
  private logger = new Logger('Boards');
  constructor(private couponsService: CouponsService) {}

  @Get()
  getAllBoard(): Promise<Coupon[]> {
    this.logger.verbose(`User trying to get all coupons`);
    return this.couponsService.getAllCoupons();
  }

  @Post()
  @UsePipes(CouponStatusValidationPipe)
  createCoupon(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    // @GetUser() user:User
    this.logger.verbose(`User creating a new board. 
      Payload: ${JSON.stringify(createCouponDto)} `); // ${user.username}
    return this.couponsService.createCoupon(createCouponDto); //, user
  }

  @Get('/:id')
  getCouponById(@Param('id') id: number): Promise<Coupon> {
    return this.couponsService.getCouponById(id);
  }

  @Delete('/:id')
  deleteCoupon(
    @Param('id', ParseIntPipe) id,
    //@GetUser() user:User
  ): Promise<void> {
    return this.couponsService.deleteCoupon(id); // , user
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', CouponStatusValidationPipe) status: CouponStatus,
  ) {
    return this.couponsService.updateBoardStatus(id); // , status
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
