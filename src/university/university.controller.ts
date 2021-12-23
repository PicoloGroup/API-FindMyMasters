import {
  Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { University } from '@prisma/client';
import { UniversityService } from './university.service';

@ApiTags('university')
@Controller('university')
export class UniversityController {
  constructor(private readonly universitiesService: UniversityService) {
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getUniversityById(@Param('id') id: number): Promise<University | null> {
    return this.universitiesService.getUniversityById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getAllUniversities(@Query('page') page: number, @Query('limit') limit: number): Promise<University[] | null> {
    return this.universitiesService.getAllUniversities(page, limit);
  }
}
