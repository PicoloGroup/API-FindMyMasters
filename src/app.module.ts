import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { UniversityController } from './university/university.controller';
import { UniversityService } from './university/university.service';
import { MasterProgramsController } from './master-programs/master-programs.controller';
import { MasterProgramsService } from './master-programs/master-programs.service';

@Module({
  imports: [UserModule, AuthModule, MailSenderModule],
  controllers: [UniversityController, MasterProgramsController],
  providers: [UniversityService, MasterProgramsService],
})
export class AppModule {
}
