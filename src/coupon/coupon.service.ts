import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon, CouponType} from './entities/coupon.entity';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { generateUniqueCouponCode } from '../utils/random-code-generator';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  // 쿠폰 생성
  async create(createPointDto: CreateCouponDto): Promise<Coupon> {
    const {
      type,
      amount,
      serviceType,
      validityDate,
      expirationDate,
      discountRate,
      information,
    } = createPointDto;
    const couponCode = generateUniqueCouponCode();

    const newCoupon = this.couponRepository.create({
      type,
      amount: type === CouponType.AMOUNT ? amount : null,
      discountRate: type === CouponType.DISCOUNT ? discountRate : null,
      serviceType,
      validityDate,
      expirationDate,
      couponCode,
      information,
    });
    return await this.couponRepository.save(newCoupon);
  }

  // 모든 쿠폰 조회
  async findAll(): Promise<Coupon[]> {
    return await this.couponRepository.find();
  }

  // 특정 쿠폰 조회
  async findOne(id: number): Promise<Coupon> {
    const coupon = await this.couponRepository.findOneBy({ id });
    if (!coupon) {
      throw new NotFoundException(`해당 쿠폰이 존재하지 않습니다.`);
    }
    return coupon;
  }

  // 쿠폰 업데이트
  async update(
    id: number,
    updateData: Partial<CreateCouponDto>,
  ): Promise<Coupon> {
    const coupon = await this.findOne(id);

    if (updateData.type === CouponType.AMOUNT) {
      coupon.amount = updateData.amount;
      coupon.discountRate = null; // 할인율 초기화
    } else if (updateData.type === CouponType.DISCOUNT) {
      coupon.discountRate = updateData.discountRate;
      coupon.amount = null; // 금액 초기화
    }

    if (updateData.serviceType) {
      coupon.serviceType = updateData.serviceType;
    }

    if (updateData.expirationDate) {
      coupon.expirationDate = new Date(updateData.expirationDate);
    }

    return await this.couponRepository.save(coupon);
  }

  // 쿠폰 삭제
  async delete(id: number): Promise<void> {
    const result = await this.couponRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`해당 쿠폰이 존재하지 않습니다.`);
    }
  }
}
