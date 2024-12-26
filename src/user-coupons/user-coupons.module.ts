import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoupon } from './entities/user-coupons.entity';
import { UserCouponService } from './user-coupons.service';
import { UserCouponController } from './user-coupons.controller';
import { User } from '../user/enitities/user.entity';
import { Coupon } from '../coupon/entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCoupon, User, Coupon])],
  controllers: [UserCouponController],
  providers: [UserCouponService],
})
export class UserCouponsModule {}
