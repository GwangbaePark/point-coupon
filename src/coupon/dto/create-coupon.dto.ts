import {
  IsEnum,
  IsInt,
  IsOptional,
  IsISO8601,
  Min,
  Max,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { CouponType, ServiceType } from '../entities/coupon.entity';

export class CreateCouponDto {
  @IsEnum(CouponType, { message: 'Invalid coupon type. Allowed types: DISCOUNT, AMOUNT' })
  type: CouponType; // 쿠폰 타입 (할인권 또는 금액권)

  @ValidateIf((o) => o.type === CouponType.AMOUNT)
  @IsInt()
  @Min(1000)
  @Max(5000)
  amount?: number; // 금액권 쿠폰 (1000원, 5000원)

  @ValidateIf((o) => o.type === CouponType.DISCOUNT)
  @IsNumber()
  @Min(0.01)
  @Max(0.1)
  discountRate?: number; // 할인권 쿠폰 (5% = 0.05, 10% = 0.1)

  @IsEnum(ServiceType, { message: `Invalid service type. Allowed values: ${Object.values(ServiceType).join(', ')}` })
  serviceType: ServiceType; // 스킬업, M클래스, 해피폴리오

  @IsOptional()
  @IsISO8601({}, { message: 'Invalid expiration date. Provide a valid ISO8601 date string.' })
  expirationDate?: string; // 유효기간 (옵션)
}