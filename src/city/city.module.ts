import { Module } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  controllers: [CityController],
  providers: [CityService, PrismaService],
  exports: [CityService],
})
export class CityModule {}
