import { Test, TestingModule } from '@nestjs/testing';
import { MasterProgramsController } from './master-programs.controller';

describe('MasterProgramsController', () => {
  let controller: MasterProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProgramsController],
    }).compile();

    controller = module.get<MasterProgramsController>(MasterProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
