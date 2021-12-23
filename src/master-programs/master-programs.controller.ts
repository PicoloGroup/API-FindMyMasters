import {
  Body,
  Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MasterProgramsService } from './master-programs.service';
import { CommentRequest, FindMasterProgramRequest, MasterProgramResponse } from './models';

@ApiTags('program')
@Controller('program')
export class MasterProgramsController {
  constructor(private readonly masterProgramService: MasterProgramsService) {
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsById(@Param('id') id: number): Promise<MasterProgramResponse | null> {
    return this.masterProgramService.getMasterProgramById(id);
  }

  @Post('comment')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async createCommentForMasterProgram(@Body() commentRequest: CommentRequest): Promise<boolean> {
    return this.masterProgramService.commentMasterProgram(commentRequest);
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

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsByFilter(findRequest: FindMasterProgramRequest): Promise<MasterProgramResponse[] | null> {
    return this.masterProgramService.getMasterProgramByFilter(findRequest);
  }
}
