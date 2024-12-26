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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('쿠폰 사용')
@Controller('user-coupons')
export class UserCouponController {
  constructor(private readonly userCouponService: UserCouponService) {}

  @ApiOperation({ summary: '사용자에게 쿠폰 등록' })
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async addCoupon(@Body() addCouponDto: AddCouponDto) {
    return this.userCouponService.addCoupon(addCouponDto);
  }

  @ApiOperation({ summary: '사용자 보유 쿠폰 조회' })
  @Get(':userId')
  async findUserCoupons(@Param('userId') userId: number) {
    return this.userCouponService.findUserCoupons(userId);
  }

  @ApiOperation({ summary: '쿠폰 사용' })
  @Patch(':userCouponId/use')
  async useCoupon(@Param('userCouponId') userCouponId: number) {
    return this.userCouponService.useCoupon(userCouponId);
  }
}
