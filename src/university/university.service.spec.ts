import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../common/services/prisma.service';
import { UniversityService } from './university.service';

describe('UniversityService', () => {
  let service: UniversityService;
  let spyPrismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniversityService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        }],
    }).compile();

    service = module.get<UniversityService>(UniversityService);
    spyPrismaService = module.get(PrismaService) as DeepMockProxy<PrismaService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyPrismaService).toBeDefined();
  });
});
