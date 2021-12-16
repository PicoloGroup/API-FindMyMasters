import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { UniversityModule } from './university/university.module';
import { MasterProgramsModule } from './master-programs/master-programs.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [UserModule, AuthModule, MailSenderModule, UniversityModule, MasterProgramsModule, CityModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
