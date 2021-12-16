import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { MasterProgramsController } from './master-programs.controller';
import { MasterProgramsService } from './master-programs.service';
import { PrismaService } from '../common/services/prisma.service';

describe('MasterProgramsController', () => {
  let controller: MasterProgramsController;
  let spyService: MasterProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProgramsController],
      providers: [UserService, PrismaService, MasterProgramsService],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = module.get<MasterProgramsController>(MasterProgramsController);
    spyService = module.get<MasterProgramsService>(MasterProgramsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
  });
});
