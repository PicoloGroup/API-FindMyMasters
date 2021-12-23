import {
  Controller, Get, HttpCode, HttpStatus, Param, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { QuickApplication, User } from '@prisma/client';
import { Usr } from '../user/user.decorator';
import { UniversityAdminService } from './university-admin.service';

@ApiTags('university-admin')
@Controller('university-admin')
export class UniversityAdminController {
  constructor(private readonly universityAdminService: UniversityAdminService) {
  }

  @ApiBearerAuth()
  @Get('applications/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getUniversityById(@Param('id') id: number): Promise<QuickApplication | null> {
    return this.universityAdminService.getApplication(id);
  }

  @Get('applications')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getAllUniversities(@Usr() user: User, @Query('page') page: number, @Query('limit') limit: number): Promise<QuickApplication[] | null> {
    return this.universityAdminService.getApplications(user, page, limit);
  }
}
