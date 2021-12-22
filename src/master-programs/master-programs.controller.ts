import {
  Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query, UseGuards,
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
  async getMasterPrograms(@Query('page') page: number, @Query('limit') limit: number): Promise<(MasterProgramResponse | null)[]> {
    if (Number.isNaN(page) || Number.isNaN(limit)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Please provide a valid page number and limit as follow ex: /:id?page=0&limit=10',
      }, HttpStatus.FORBIDDEN);
    }

    return this.masterProgramService.getAllMasterPrograms(page, limit);
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
  async getRecommendationsForStudent(@Param('studentid') studentid: number, @Query('page') page: number, @Query('limit') limit: number): Promise<MasterProgramResponse[] | null> {
    if (Number.isNaN(page) || Number.isNaN(limit)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Please provide a valid page number and limit as follow ex: /:id?page=0&limit=10',
      }, HttpStatus.FORBIDDEN);
    }

    return this.masterProgramService.getStudentRecommendations(studentid, page, limit);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsByFilter(findRequest: FindMasterProgramRequest): Promise<MasterProgramResponse[] | null> {
    return this.masterProgramService.getMasterProgramByFilter(findRequest);
  }
}
