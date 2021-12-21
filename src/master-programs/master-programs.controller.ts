import {
  Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MasterProgramsService } from './master-programs.service';
import { FindMasterProgramRequest, MasterProgramResponse } from './models';

@ApiTags('program')
@Controller('program')
export class MasterProgramsController {
  constructor(private readonly masterProgramService: MasterProgramsService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterPrograms(): Promise<MasterProgramResponse[]> {
    return this.masterProgramService.getAllMasterPrograms();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsById(@Param('id') id: number): Promise<MasterProgramResponse | null> {
    return this.masterProgramService.getMasterProgramById(id);
  }

  @ApiBearerAuth()
  @Get('recommendations/:studentid')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getRecommendationsForStudent(@Param('studentid') studentid: number): Promise<MasterProgramResponse[] | null> {
    return this.masterProgramService.getStudentRecommendations(studentid);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsByFilter(findRequest: FindMasterProgramRequest): Promise<MasterProgramResponse[] | null> {
    return this.masterProgramService.getMasterProgramByFilter(findRequest);
  }
}
