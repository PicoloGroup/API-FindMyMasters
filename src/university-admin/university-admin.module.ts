import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../common/services/prisma.service';
import { UniversityAdminController } from './university-admin.controller';
import { UniversityAdminService } from './university-admin.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UniversityAdminController],
  providers: [UniversityAdminService, PrismaService],
  exports: [UniversityAdminService],
})
export class UniversityAdminModule {}
