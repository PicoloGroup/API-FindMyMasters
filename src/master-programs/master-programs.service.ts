import { Injectable } from '@nestjs/common';
import { MasterProgram } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { FindMasterProgramRequest } from './models/request/find-request';

@Injectable()
export class MasterProgramsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public async getMasterProgramById(id: number): Promise<MasterProgram | null> {
    return this.prisma.masterProgram.findUnique({
      where: { id },
    });
  }

  public async getStudentRecommendations(id: number): Promise<MasterProgram[] | null> {
    const recommended = await this.prisma.masterProgramRecommendation.findMany({
      where: {
        studentId: id,
      },
      select: {
        masterProgramId: true,
      },
    });

    const recommendedIds : number[] = [];

    recommended.forEach((value) => {
      recommendedIds.push(value.masterProgramId);
    });

    return this.prisma.masterProgram.findMany({
      where: {
        id: { in: recommendedIds },
      },
    });
  }

  public async getAllMasterPrograms(): Promise<MasterProgram[]> {
    return this.prisma.masterProgram.findMany();
  }

  public async getMasterProgramByFilter(findRequest: FindMasterProgramRequest): Promise<MasterProgram[] | null> {
    return this.prisma.masterProgram.findMany({
      where: {
        duration: findRequest.duration,
        language: findRequest.language,
        mode: findRequest.mode,
        field: findRequest.field,
        tution_currency: findRequest.tution_currency,
      },
    });
  }
}
