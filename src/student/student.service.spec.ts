import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../common/services/prisma.service';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let spyPrismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        }],
    }).compile();

    service = module.get<StudentService>(StudentService);
    spyPrismaService = module.get(PrismaService) as DeepMockProxy<PrismaService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyPrismaService).toBeDefined();
  });
});
