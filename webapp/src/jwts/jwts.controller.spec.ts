import { Test, TestingModule } from '@nestjs/testing';
import { JwtsController } from './jwts.controller';
import { JwtsService } from './jwts.service';

describe('JwtsController', () => {
  let controller: JwtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwtsController],
      providers: [JwtsService],
    }).compile();

    controller = module.get<JwtsController>(JwtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
