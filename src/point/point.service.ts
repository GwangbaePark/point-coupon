import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from './entities/point.entity';
import { CreatePointDto } from './dto/create-point.dto';
import { User } from '../user/enitities/user.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 포인트 등록
  async create(createPointDto: CreatePointDto): Promise<Point> {
    const { userId, serviceType, points } = createPointDto;

    // 사용자 검증
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // 포인트 생성 및 저장
    const newPoint = this.pointRepository.create({ user, serviceType, points });
    return await this.pointRepository.save(newPoint);
  }

  // 특정 사용자별 포인트 조회
  async findAllByUser(userId: number): Promise<Point[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['points'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    return user.points;
  }
}
