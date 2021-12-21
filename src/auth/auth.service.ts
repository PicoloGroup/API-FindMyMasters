import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { Prisma, Role } from '@prisma/client';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  LoginRequest,
  UniversityLoginRequest,
  ResetPasswordRequest,
  SignupRequest,
} from './models';
import { AuthUser } from './auth-user';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async studentSignup(signupRequest: SignupRequest): Promise<void> {
    const emailVerificationToken = nanoid();

    try {
      await this.prisma.user.create({
        data: {
          email: signupRequest.email.toLowerCase(),
          passwordHash: await bcrypt.hash(signupRequest.password, 10),
          role: Role.STUDENT,
          student: {
            create: {
              email: signupRequest.email.toLowerCase(),
            },
          },
          emailVerification: {
            create: {
              token: emailVerificationToken,
            },
          },
        },
        select: null,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException();
        } else throw e;
      } else throw e;
    }

    await MailSenderService.sendVerifyEmailMail(
      signupRequest.email,
      emailVerificationToken,
    );
  }

  async resendVerificationMail(
    email: string,
    userId: number,
  ): Promise<void> {
    // delete old email verification tokens if exist
    const deletePrevEmailVerificationIfExist = this.prisma.emailVerification.deleteMany({
      where: { userId },
    });

    const token = nanoid();

    const createEmailVerification = this.prisma.emailVerification.create({
      data: {
        userId,
        token,
      },
      select: null,
    });

    await this.prisma.$transaction([deletePrevEmailVerificationIfExist, createEmailVerification]);

    await MailSenderService.sendVerifyEmailMail(
      email,
      token,
    );
  }

  async verifyEmail(token: string): Promise<void> {
    const emailVerification = await this.prisma.emailVerification.findUnique({
      where: { token },
    });

    if (emailVerification !== null && emailVerification.validUntil > new Date()) {
      await this.prisma.user.update({
        where: { id: emailVerification.userId },
        data: {
          emailVerified: true,
        },
        select: null,
      });
    } else {
      Logger.log(`Verify email called with invalid email token ${token}`);
      throw new NotFoundException();
    }
  }

  async sendChangeEmailMail(
    changeEmailRequest: ChangeEmailRequest,
    userId: number,
    oldEmail: string,
  ): Promise<void> {
    const emailAvailable = await this.isEmailAvailable(changeEmailRequest.newEmail);
    if (!emailAvailable) {
      Logger.log(
        `User with id ${userId} tried to change its email to already used ${
          changeEmailRequest.newEmail
        }`,
      );
      throw new ConflictException();
    }

    const deletePrevEmailChangeIfExist = this.prisma.emailChange.deleteMany({
      where: { userId },
    });

    const token = nanoid();

    const createEmailChange = this.prisma.emailChange.create({
      data: {
        userId,
        token,
        newEmail: changeEmailRequest.newEmail,
      },
      select: null,
    });

    await this.prisma.$transaction([deletePrevEmailChangeIfExist, createEmailChange]);

    await MailSenderService.sendChangeEmailMail(oldEmail, token);
  }

  async changeEmail(token: string): Promise<void> {
    const emailChange = await this.prisma.emailChange.findUnique({
      where: { token },
    });

    if (emailChange !== null && emailChange.validUntil > new Date()) {
      await this.prisma.user.update({
        where: { id: emailChange.userId },
        data: {
          email: emailChange.newEmail.toLowerCase(),
        },
        select: null,
      });
    } else {
      Logger.log(`Invalid email change token ${token} is rejected.`);
      throw new NotFoundException();
    }
  }

  async sendResetPasswordMail(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
      },
    });

    if (user === null) {
      throw new NotFoundException();
    }

    const deletePrevPasswordResetIfExist = this.prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    const token = nanoid();

    const createPasswordReset = this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
      },
      select: null,
    });

    await this.prisma.$transaction([deletePrevPasswordResetIfExist, createPasswordReset]);

    if (user.email === null) {
      throw new NotFoundException();
    }

    await MailSenderService.sendResetPasswordMail(
      user.email,
      token,
    );
  }

  async resetPassword(
    resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    const passwordReset = await this.prisma.passwordReset.findUnique({
      where: { token: resetPasswordRequest.token },
    });

    if (passwordReset !== null && passwordReset.validUntil > new Date()) {
      await this.prisma.user.update({
        where: { id: passwordReset.userId },
        data: {
          passwordHash: await bcrypt.hash(resetPasswordRequest.newPassword, 10),
        },
        select: null,
      });
    } else {
      Logger.log(
        `Invalid reset password token ${
          resetPasswordRequest.token
        } is rejected`,
      );
      throw new NotFoundException();
    }
  }

  async changePassword(
    changePasswordRequest: ChangePasswordRequest,
    userId: number,
    email: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: await bcrypt.hash(changePasswordRequest.newPassword, 10),
      },
      select: null,
    });

    // no need to wait for information email
    MailSenderService.sendPasswordChangeInfoMail(email);
  }

  async validateUser(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (
      user !== null
      && user.email === payload.email
    ) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async universityLogin(loginRequest: UniversityLoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.username;
    const user = await this.prisma.user.findFirst({
      where: {
        username: normalizedIdentifier,
      },
      select: {
        id: true,
        passwordHash: true,
        email: true,
        role: true,
      },
    });

    if (
      user === null
      || user.role !== Role.UNIVERSITYADMIN) {
      Logger.log(`user not found or user role not matched!${user}`);
      throw new UnauthorizedException();
    }

    if (
      user === null
      || !bcrypt.compareSync(loginRequest.password, user.passwordHash)
    ) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: user.id,
      email: null,
      username: loginRequest.username,
    };

    return this.jwtService.signAsync(payload);
  }

  async studentLogin(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.email.toLowerCase();
    const user = await this.prisma.user.findFirst({
      where: {
        email: normalizedIdentifier,
      },
      select: {
        id: true,
        passwordHash: true,
        email: true,
        role: true,
      },
    });

    if (
      user === null
      || user.role !== Role.STUDENT
    ) {
      throw new UnauthorizedException();
    }

    if (
      user === null
      || !bcrypt.compareSync(loginRequest.password, user.passwordHash)
    ) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      username: null,
    };

    return this.jwtService.signAsync(payload);
  }

  async isEmailAvailable(
    email: string,
  ): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { email: true },
    });
    return user === null;
  }
}
