import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserCouponService } from './user-coupons.service';
import { AddCouponDto } from './dto/add-coupon.dto';

@Controller('user-coupons')
export class UserCouponController {
  constructor(private readonly userCouponService: UserCouponService) {}

  // 사용자에게 쿠폰 등록
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addCoupon(@Body() addCouponDto: AddCouponDto) {
    return this.userCouponService.addCoupon(addCouponDto);
  }

  // 사용자 보유 쿠폰 조회
  @Get(':userId')
  async findUserCoupons(@Param('userId') userId: number) {
    return this.userCouponService.findUserCoupons(userId);
  }

  // 쿠폰 사용
  @Patch(':userCouponId/use')
  async useCoupon(@Param('userCouponId') userCouponId: number) {
    return this.userCouponService.useCoupon(userCouponId);
  }
}