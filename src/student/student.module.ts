import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MasterProgramsService } from '../master-programs/master-programs.service';
import { PrismaService } from '../common/services/prisma.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [StudentController],
  providers: [StudentService, PrismaService, MasterProgramsService],
  exports: [StudentService],
})
export class StudentModule {}
