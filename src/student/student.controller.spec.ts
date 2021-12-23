import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { MasterProgramsService } from '../master-programs/master-programs.service';
import { PrismaService } from '../common/services/prisma.service';
import { UserService } from '../user/user.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let spyService: StudentService;
  let spyMasterProgramsService: MasterProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [UserService, PrismaService, StudentService, MasterProgramsService],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    spyService = module.get<StudentService>(StudentService);
    spyMasterProgramsService = module.get<MasterProgramsService>(MasterProgramsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(spyService).toBeDefined();
    expect(spyMasterProgramsService).toBeDefined();
  });
});
