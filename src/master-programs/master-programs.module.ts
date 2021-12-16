import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../common/services/prisma.service';
import { MasterProgramsController } from './master-programs.controller';
import { MasterProgramsService } from './master-programs.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MasterProgramsController],
  providers: [MasterProgramsService, PrismaService],
  exports: [MasterProgramsService],
})

@Module({})
export class MasterProgramsModule {}
