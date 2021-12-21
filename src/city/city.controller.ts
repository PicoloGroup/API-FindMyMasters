import {
  Controller, Get, HttpCode, HttpStatus, Param, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { City } from '@prisma/client';
import { CityService } from './city.service';

@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterPrograms(): Promise<City[]> {
    return this.cityService.getAllCities();
  }

  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getMasterProgramsById(@Param('id') id: number): Promise<City | null> {
    return this.cityService.getCityById(id);
  }
}
