import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CouponModule } from './coupon/coupon.module';
import { PointModule } from './point/point.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    CouponModule,
    PointModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'test_db',
      autoLoadEntities: true, // 엔티티를 자동으로 로드
      synchronize: true, // 개발 환경에서만 true (데이터베이스 스키마를 자동으로 생성)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
