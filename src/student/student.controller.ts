import {
  Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { StudentService } from './student.service';

@ApiTags('program')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsById(@Param('id') id: number): Promise<Student | null> {
    return this.studentService.getStudentById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterPrograms(@Query('page') page: number, @Query('limit') limit: number): Promise<Student[] | null> {
    return this.studentService.getAllStudents(page, limit);
  }
}
