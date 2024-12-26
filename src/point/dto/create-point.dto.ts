import { IsEnum, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ServiceType } from '../../coupon/entities/coupon.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePointDto {
  @ApiProperty({ example: '12', description: '사용자 아이디' })
  @IsInt()
  @IsNotEmpty({ message: 'User ID is required.' })
  userId: number; // 사용자 ID

  @ApiProperty({ example: '스킬업', description: '서비스 종류' })
  @IsEnum(ServiceType, {
    message: `Invalid service type. Allowed values: ${Object.values(ServiceType).join(', ')}`,
  })
  serviceType: ServiceType; // 서비스 타입

  @ApiProperty({ example: '1000', description: '적립 포인트 금액' })
  @IsInt()
  @Min(1, { message: 'Points must be greater than or equal to 1.' })
  points: number; // 적립 포인트
}
