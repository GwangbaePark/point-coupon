import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  // 쿠폰 생성
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createCouponDto: CreateCouponDto) {
    const { type, amount, discountRate, serviceType, expirationDate } = createCouponDto;
    const expiration = expirationDate ? new Date(expirationDate) : null;
    return await this.couponService.create(
      type,
      amount,
      discountRate,
      serviceType,
      expiration,
    );
  }

  // 모든 쿠폰 조회
  @Get()
  async findAll() {
    return await this.couponService.findAll();
  }

  // 특정 쿠폰 조회
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.couponService.findOne(id);
  }

  // 쿠폰 업데이트
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(
    @Param('id') id: number,
    @Body() updateCouponDto: Partial<CreateCouponDto>, // 선택적으로 업데이트
  ) {
    return await this.couponService.update(id, updateCouponDto);
  }

  // 쿠폰 삭제
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.couponService.delete(id);
  }
}
