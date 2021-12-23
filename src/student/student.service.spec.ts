import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { MasterProgramsService } from '../master-programs/master-programs.service';
import { PrismaService } from '../common/services/prisma.service';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let spyPrismaService: DeepMockProxy<PrismaService>;
  let spyMasterProgramsService: DeepMockProxy<MasterProgramsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        },
        {
          provide: MasterProgramsService,
          useFactory: () => mockDeep<MasterProgramsService>(),
        }],
    }).compile();

    service = module.get<StudentService>(StudentService);
    spyPrismaService = module.get(PrismaService) as DeepMockProxy<PrismaService>;
    spyMasterProgramsService = module.get(MasterProgramsService) as DeepMockProxy<MasterProgramsService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyPrismaService).toBeDefined();
    expect(spyMasterProgramsService).toBeDefined();
  });
});
