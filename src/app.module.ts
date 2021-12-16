import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { UniversityModule } from './university/university.module';
import { MasterProgramsModule } from './master-programs/master-programs.module';

@Module({
  imports: [UserModule, AuthModule, MailSenderModule, UniversityModule, MasterProgramsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
