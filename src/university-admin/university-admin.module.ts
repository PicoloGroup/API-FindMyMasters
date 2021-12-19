import { Module } from '@nestjs/common';
import { UniversityAdminController } from './university-admin.controller';
import { UniversityAdminService } from './university-admin.service';

@Module({
  controllers: [UniversityAdminController],
  providers: [UniversityAdminService],
})
export class UniversityAdminModule {}
