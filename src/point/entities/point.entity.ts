import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ServiceType } from '../../coupon/entities/coupon.entity';
import { User } from '../../user/enitities/user.entity';

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType: ServiceType; // 서비스 타입

  @Column({ type: 'int' })
  points: number; // 적립 포인트

  @ManyToOne(() => User, (user) => user.points, { onDelete: 'CASCADE' })
  user: User; // 사용자 관계

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}