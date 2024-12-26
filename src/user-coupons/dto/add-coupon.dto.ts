import { IsInt } from 'class-validator';

export class AddCouponDto {
  @IsInt()
  userId: number;

  @IsInt()
  couponId: number;
}
