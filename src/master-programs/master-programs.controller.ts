import {
  Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MasterProgram } from '@prisma/client';
import { MasterProgramsService } from './master-programs.service';
import { FindMasterProgramRequest } from './models';

@ApiTags('master-programs')
@Controller('master-programs')
export class MasterProgramsController {
  constructor(private readonly masterProgramService: MasterProgramsService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getMasterPrograms(): Promise<MasterProgram[]> {
    return this.masterProgramService.getAllMasterPrograms();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getMasterProgramsById(@Param('id') id: number): Promise<MasterProgram | null> {
    return this.masterProgramService.getMasterProgramById(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getMasterProgramsByFilter(findRequest: FindMasterProgramRequest): Promise<MasterProgram[] | null> {
    return this.masterProgramService.getMasterProgramByFilter(findRequest);
  }
}
