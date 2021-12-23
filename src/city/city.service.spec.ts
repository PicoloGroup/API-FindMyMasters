import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from '../common/services/prisma.service';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let spyPrismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: PrismaService,
          useFactory: () => mockDeep<PrismaService>(),
        }],
    }).compile();

    service = module.get<CityService>(CityService);
    spyPrismaService = module.get(PrismaService) as DeepMockProxy<PrismaService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(spyPrismaService).toBeDefined();
  });
});
