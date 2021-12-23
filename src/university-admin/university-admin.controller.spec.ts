import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../common/services/prisma.service';
import { UserService } from '../user/user.service';
import { UniversityAdminController } from './university-admin.controller';
import { UniversityAdminService } from './university-admin.service';

describe('UniversityAdminController', () => {
  let controller: UniversityAdminController;
  let spyService: UniversityAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityAdminController],
      providers: [UserService, PrismaService, UniversityAdminService],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = module.get<UniversityAdminController>(UniversityAdminController);
    spyService = module.get<UniversityAdminService>(UniversityAdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
