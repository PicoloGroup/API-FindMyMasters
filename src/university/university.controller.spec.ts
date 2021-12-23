import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { UserService } from '../user/user.service';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

describe('UniversityController', () => {
  let controller: UniversityController;
  let spyService: UniversityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityController],
      providers: [UserService, PrismaService, UniversityService],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = module.get<UniversityController>(UniversityController);
    spyService = module.get<UniversityService>(UniversityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
