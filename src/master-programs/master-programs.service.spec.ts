import { Test, TestingModule } from '@nestjs/testing';
import { MasterProgramsService } from './master-programs.service';

describe('MasterProgramsService', () => {
  let service: MasterProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProgramsService],
    }).compile();

    service = module.get<MasterProgramsService>(MasterProgramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
