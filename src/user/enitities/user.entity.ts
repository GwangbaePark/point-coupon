import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Point } from '../../point/entities/point.entity';
import { UserCoupon } from '../../user-coupons/entities/user-coupons.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F'],
  })
  gender: string;

  @OneToMany(() => Point, (point) => point.user)
  points: Point[]; // 사용자의 적립 포인트 관계

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.user)
  userCoupons: UserCoupon[];
}
