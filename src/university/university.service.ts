import { Injectable } from '@nestjs/common';
import { University } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class UniversityService {
  constructor(
    private readonly prisma: PrismaService,
  ) {

  }

  public async getUniversityById(id: number) : Promise<University | null> {
    return this.prisma.university.findUnique({
      where: { id },
    });
  }

  public async getAllUniversities(page: number, limit: number): Promise<University[] | null> {
    return this.prisma.university.findMany({
      skip: page,
      take: limit,
    });
  }
}
