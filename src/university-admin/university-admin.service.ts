import { Injectable } from '@nestjs/common';
import {
  QuickApplication, Role, UniversityAdmin, User,
} from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class UniversityAdminService {
  constructor(
    private readonly prisma: PrismaService,
  ) {

  }

  public async getApplication(id: number) : Promise<QuickApplication | null> {
    return this.prisma.quickApplication.findUnique({
      where: {
        id,
      },
    });
  }

  public async getApplications(user: User, page: number, limit: number) : Promise<QuickApplication[] | null> {
    if (user.role !== Role.UNIVERSITYADMIN) {
      return null;
    }

    const admin = await this.prisma.universityAdmin.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (admin === null) {
      return null;
    }

    return this.prisma.quickApplication.findMany({
      where: { universityId: admin.universityId },
      skip: page,
      take: limit,
    });
  }

  public async getAllUniversities(page: number, limit: number): Promise<UniversityAdmin[] | null> {
    return this.prisma.universityAdmin.findMany({
      skip: page,
      take: limit,
    });
  }
}
