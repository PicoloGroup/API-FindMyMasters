import {
  Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Student, User,
} from '@prisma/client';
import { MasterProgramResponse } from '../master-programs/models';
import { Usr } from '../user/user.decorator';
import { StudentService } from './student.service';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }

  @Get('applications')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getStudentApplications(@Usr() user: User): Promise<(MasterProgramResponse | null)[] | null> {
    return this.studentService.getApplications(user);
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsById(@Param('id') id: number): Promise<Student | null> {
    return this.studentService.getStudentById(id);
  }

  @ApiBearerAuth()
  @Post('apply/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async applyMasterProgram(@Usr() user: User, @Param('id') masterProgramId: number): Promise<boolean> {
    return this.studentService.applyMasterProgram(user, masterProgramId);
  }

  @ApiBearerAuth()
  @Post('unapply/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async unApplyMasterProgram(@Usr() user: User, @Param('id') masterProgramId: number): Promise<boolean> {
    return this.studentService.unApplyMasterProgram(user, masterProgramId);
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterPrograms(@Query('page') page: number, @Query('limit') limit: number): Promise<Student[] | null> {
    return this.studentService.getAllStudents(page, limit);
  }
}
