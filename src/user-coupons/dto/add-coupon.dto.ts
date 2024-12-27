import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCouponDto {
  @ApiProperty({ example: '1', description: '회원 아이디' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'AAD36F632F', description: '쿠폰 발행코드' })
  @IsString()
  @IsNotEmpty({ message: 'Coupon Code is required.' })
  couponCode: string;
}
