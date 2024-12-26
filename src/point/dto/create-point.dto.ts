import { IsEnum, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ServiceType } from '../../coupon/entities/coupon.entity';

export class CreatePointDto {
  @IsInt()
  @IsNotEmpty({ message: 'User ID is required.' })
  userId: number; // 사용자 ID

  @IsEnum(ServiceType, {
    message: `Invalid service type. Allowed values: ${Object.values(ServiceType).join(', ')}`,
  })
  serviceType: ServiceType; // 서비스 타입

  @IsInt()
  @Min(1, { message: 'Points must be greater than or equal to 1.' })
  points: number; // 적립 포인트
}
