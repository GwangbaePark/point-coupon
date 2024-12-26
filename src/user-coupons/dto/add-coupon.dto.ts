import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCouponDto {
  @ApiProperty({ example: '1', description: '회원 아이디' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: '2', description: '쿠폰 아이디' })
  @IsInt()
  couponId: number;
}
