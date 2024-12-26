import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../user/enitities/user.entity';
import { Coupon } from '../../coupon/entities/coupon.entity';

@Entity('user_coupons')
export class UserCoupon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userCoupons, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Coupon, { onDelete: 'CASCADE' })
  coupon: Coupon;

  @Column({ default: false })
  used: boolean; // 사용 여부
}