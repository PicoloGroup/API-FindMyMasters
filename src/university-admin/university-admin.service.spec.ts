import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../common/services/prisma.service';
import { UniversityAdminService } from './university-admin.service';

describe('UniversityAdminService', () => {
  let service: UniversityAdminService;
  let spyPrismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniversityAdminService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        }],
    }).compile();

    service = module.get<UniversityAdminService>(UniversityAdminService);
    spyPrismaService = module.get(PrismaService) as DeepMockProxy<PrismaService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyPrismaService).toBeDefined();
  });
});
