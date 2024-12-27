import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCoupon } from './entities/user-coupons.entity';
import { AddCouponDto } from './dto/add-coupon.dto';
import { User } from '../user/enitities/user.entity';
import { Coupon } from '../coupon/entities/coupon.entity';

@Injectable()
export class UserCouponService {
  constructor(
    @InjectRepository(UserCoupon)
    private readonly userCouponRepository: Repository<UserCoupon>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  // 사용자에게 쿠폰 등록
  async addCoupon(addCouponDto: AddCouponDto): Promise<UserCoupon> {
    const { userId, couponCode } = addCouponDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const coupon = await this.couponRepository.findOneBy({ couponCode });
    if (!coupon) {
      throw new NotFoundException(`Coupon with code ${couponCode} not found.`);
    }

    const existingUserCoupon = await this.userCouponRepository.findOne({
      where: { coupon: { id: coupon.id } },
    });
    if (existingUserCoupon) {
      throw new BadRequestException(
        '등록하신 쿠폰은 이미 등록되어 있는 쿠폰입니다.',
      );
    }

    const userCoupon = this.userCouponRepository.create({ user, coupon });
    return this.userCouponRepository.save(userCoupon);
  }

  // 사용자 보유 쿠폰 조회
  async findUserCoupons(userId: number): Promise<UserCoupon[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userCoupons', 'userCoupons.coupon'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return user.userCoupons;
  }

  // 쿠폰 사용
  async useCoupon(userCouponId: number): Promise<UserCoupon> {
    const userCoupon = await this.userCouponRepository.findOne({
      where: { id: userCouponId },
      relations: ['coupon'],
    });
    if (!userCoupon) {
      throw new NotFoundException(
        `UserCoupon with ID ${userCouponId} not found.`,
      );
    }

    if (userCoupon.used) {
      throw new BadRequestException('This coupon has already been used.');
    }

    if (
      userCoupon.coupon.expirationDate &&
      new Date() > userCoupon.coupon.expirationDate
    ) {
      throw new BadRequestException('This coupon has expired.');
    }

    userCoupon.used = true;
    return this.userCouponRepository.save(userCoupon);
  }
}
