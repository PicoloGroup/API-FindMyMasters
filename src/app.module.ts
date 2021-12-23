import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { UniversityModule } from './university/university.module';
import { MasterProgramsModule } from './master-programs/master-programs.module';
import { CityModule } from './city/city.module';
import { StudentModule } from './student/student.module';
import { UniversityAdminModule } from './university-admin/university-admin.module';

@Module({
  imports: [UserModule, AuthModule, MailSenderModule, UniversityModule, MasterProgramsModule,
    CityModule, StudentModule, UniversityAdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
