import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../common/services/prisma.service';
import { MasterProgramsService } from './master-programs.service';

describe('MasterProgramsService', () => {
  let service: MasterProgramsService;
  let spyPrismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MasterProgramsService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        }],
    }).compile();

    service = module.get<MasterProgramsService>(MasterProgramsService);
    spyPrismaService = module.get(PrismaService) as DeepMockProxy<PrismaService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyPrismaService).toBeDefined();
  });
});
