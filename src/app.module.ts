import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CouponModule } from './coupon/coupon.module';
import { PointModule } from './point/point.module';

@Module({
  imports: [UserModule, CouponModule, PointModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
