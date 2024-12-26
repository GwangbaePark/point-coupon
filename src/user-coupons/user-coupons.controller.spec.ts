import { Test, TestingModule } from '@nestjs/testing';
import { UserCouponsController } from './user-coupons.controller';

describe('UserCouponsController', () => {
  let controller: UserCouponsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCouponsController],
    }).compile();

    controller = module.get<UserCouponsController>(UserCouponsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
