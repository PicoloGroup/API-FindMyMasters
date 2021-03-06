import {
  BadRequestException,
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Student, UniversityAdmin } from '@prisma/client';
import { AuthService } from './auth.service';
import { Usr } from '../user/user.decorator';
import {
  ChangeEmailRequest, ChangePasswordRequest,
  CheckEmailRequest,
  CheckEmailResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  SignupRequest,
  UniversityLoginRequest,
} from './models';
import { AuthUser } from './auth-user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('check-email')
  @HttpCode(HttpStatus.OK)
  async checkEmailAvailability(
    @Body() checkEmailRequest: CheckEmailRequest,
  ): Promise<CheckEmailResponse> {
    const isAvailable = await this.authService.isEmailAvailable(checkEmailRequest.email);
    return new CheckEmailResponse(isAvailable);
  }

  @Post('student/signup')
  @HttpCode(HttpStatus.CREATED)
  async studentSignup(@Body() signupRequest: SignupRequest): Promise<void> {
    await this.authService.studentSignup(signupRequest);
  }

  @Post('student/login')
  @HttpCode(HttpStatus.OK)
  async studentLogin(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.studentLogin(loginRequest));
  }

  @Post('university/login')
  @HttpCode(HttpStatus.OK)
  async universityLogin(@Body() loginRequest: UniversityLoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.universityLogin(loginRequest));
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getUserWithToken(@Usr() user: AuthUser): Promise<Student | UniversityAdmin | null> {
    return this.authService.getAuthUser(user);
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyMail(@Query('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }

  @ApiBearerAuth()
  @Post('change-email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async sendChangeEmailMail(
    @Usr() user: AuthUser,
      @Body() changeEmailRequest: ChangeEmailRequest,
  ): Promise<void> {
    if (user.email === null) {
      throw new BadRequestException();
    }
    await this.authService.sendChangeEmailMail(
      changeEmailRequest,
      user.id,
      user.email,
    );
  }

  @Get('change-email')
  @HttpCode(HttpStatus.OK)
  async changeEmail(@Query('token') token: string): Promise<void> {
    await this.authService.changeEmail(token);
  }

  @Post('forgot-password/:email')
  @HttpCode(HttpStatus.OK)
  async sendResetPassword(@Param('email') email: string): Promise<void> {
    await this.authService.sendResetPasswordMail(email);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
      @Usr() user: AuthUser,
  ): Promise<void> {
    if (user.email === null) {
      throw new BadRequestException();
    }
    await this.authService.changePassword(
      changePasswordRequest,
      user.id,
      user.email,
    );
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordRequest);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async resendVerificationMail(@Usr() user: AuthUser): Promise<void> {
    if (user.email === null) {
      throw new BadRequestException();
    }
    await this.authService.resendVerificationMail(
      user.email,
      user.id,
    );
  }
}
