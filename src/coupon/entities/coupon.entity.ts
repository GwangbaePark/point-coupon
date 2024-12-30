import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from "class-transformer";

export enum CouponType {
  DISCOUNT = 'DISCOUNT', // 할인권
  AMOUNT = 'AMOUNT', // 금액권
}

export enum ServiceType {
  SKILL_UP = '스킬업',
  M_CLASS = 'M클래스',
  HAPPY_PORTFOLIO = '해피폴리오',
}

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, unique: true })
  couponCode: string; // 유니크한 10자리 문자열

  @Column({ type: 'enum', enum: CouponType })
  type: CouponType; // 쿠폰 타입: 할인권 또는 금액권

  @Column({ type: 'int', nullable: true })
  amount?: number; // 금액권 쿠폰 (1000원, 5000원)

  @Column({ type: 'float', nullable: true })
  discountRate?: number; // 할인권 쿠폰 (5%, 10%)

  @Column({ type: 'enum', enum: ServiceType })
  serviceType: ServiceType; // 스킬업, M클래스, 해피폴리오

  @Transform(({ value }) => (value ? value.toISOString().split('T')[0] : null))
  @Column({ type: 'date', nullable: true })
  validityDate?: Date; // 유효기간 시작일

  @Transform(({ value }) => (value ? value.toISOString().split('T')[0] : null))
  @Column({ type: 'date', nullable: true })
  expirationDate?: Date; // 유효기간 종료일

  @Column({ default: false })
  used: boolean; // 사용 여부

  @Column() // 쿠폰정보 필드 추가
  information: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
