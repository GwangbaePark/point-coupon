import {
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  Max,
  IsNumber,
  ValidateIf,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { CouponType, ServiceType } from '../entities/coupon.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({
    example: 'CouponType.AMOUNT',
    description: '쿠폰 종류(할인권 또는 금액권)',
  })
  @IsEnum(CouponType, {
    message: 'Invalid coupon type. Allowed types: DISCOUNT, AMOUNT',
  })
  type: CouponType;

  @ApiProperty({ example: '1000', description: '금액권 쿠폰 금액' })
  @ValidateIf((o) => o.type === CouponType.AMOUNT)
  @IsInt()
  @Min(1000)
  @Max(5000)
  amount?: number;

  @ApiProperty({
    example: '0.05',
    description: '할인권 쿠폰 할인율(5% = 0.05, 10% = 0.1)',
  })
  @ValidateIf((o) => o.type === CouponType.DISCOUNT)
  @IsNumber()
  @Min(0.01)
  @Max(0.2)
  discountRate?: number;

  @ApiProperty({ example: 'M클래스', description: '서비스 유형' })
  @IsEnum(ServiceType, {
    message: `Invalid service type. Allowed values: ${Object.values(ServiceType).join(', ')}`,
  })
  serviceType: ServiceType; // 스킬업, M클래스, 해피폴리오

  @ApiProperty({
    example: '2024-12-10',
    description: '쿠폰 유효기간 시작일',
  })
  @IsOptional()
  validityDate?: string;

  @ApiProperty({
    example: '2024-12-31',
    description: '쿠폰 유효 종료일자',
  })
  @IsOptional()
  expirationDate?: string;

  @ApiProperty({
    example: '10% Discount on all products',
    description: 'Coupon description',
  })
  @IsString()
  @IsNotEmpty()
  information: string; // 쿠폰정보 필드 추가
}
