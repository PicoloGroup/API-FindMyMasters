import { Injectable } from '@nestjs/common';
import { MasterProgramComment, MasterProgramLike } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { CommentRequest } from './models';
import { FindMasterProgramRequest } from './models/request/find-request';
import { MasterProgramResponse } from './models/response/master-programs';

type MastersResponse = MasterProgramResponse[];

@Injectable()
export class MasterProgramsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public async getMasterProgramById(id: number): Promise<MasterProgramResponse | null> {
    const masterProgram = await this.prisma.masterProgram.findUnique({
      where: { id },
    });

    if (masterProgram === null) {
      return null;
    }

    const comments = await this.getCommentsForMasterProgram(masterProgram.id);
    const likesCount = (await this.getLikesForMasterProgram(masterProgram.id)).length;

    return new MasterProgramResponse(masterProgram, comments, likesCount);
  }

  public async getStudentRecommendations(id: number, page: number, limit: number): Promise<MastersResponse | null> {
    const recommended = await this.prisma.masterProgramRecommendation.findMany({
      where: {
        studentId: id,
      },
      select: {
        masterProgramId: true,
      },
      skip: page,
      take: limit,
    });

    const recommendedIds : number[] = [];

    recommended.forEach((value) => {
      recommendedIds.push(value.masterProgramId);
    });

    const masterPrograms = await this.prisma.masterProgram.findMany({
      where: {
        id: { in: recommendedIds },
      },
    });

    const masterProgramResponses: MasterProgramResponse[] = [];

    masterPrograms.forEach(async (masterProgram) => {
      const programResponse = await this.getMasterProgramById(masterProgram.id);

      if (programResponse !== null) {
        masterProgramResponses.push(programResponse);
      }
    });

    return masterProgramResponses;
  }

  public async getAllMasterPrograms(page: number, limit: number): Promise<(MasterProgramResponse | null)[]> {
    const masterPrograms = await this.prisma.masterProgram.findMany({
      skip: page,
      take: limit,
    });

    const promises = masterPrograms.map(async (masterProgram) => {
      const masterProgramResponse = await this.getMasterProgramById(masterProgram.id);
      return masterProgramResponse;
    });

    const masterProgramResponses : (MasterProgramResponse | null)[] = await Promise.all(promises);

    return masterProgramResponses;
  }

  public async getMasterProgramByFilter(findRequest: FindMasterProgramRequest): Promise<MastersResponse | null> {
    const masterPrograms = await this.prisma.masterProgram.findMany({
      where: {
        duration: findRequest.duration,
        language: findRequest.language,
        mode: findRequest.mode,
        field: findRequest.field,
        tution_currency: findRequest.tution_currency,
      },
    });

    const masterProgramResponses = masterPrograms.map(function getMasterPrograms(masterProgram): MasterProgramResponse {
      return this.getMasterProgramById(masterProgram.id);
    });

    return masterProgramResponses;
  }

  public async likeMasterProgram(masterProgramId: number, studentId: number): Promise<boolean> {
    const masterProgram = await this.prisma.masterProgram.findUnique({
      where: { id: masterProgramId },
    });

    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (masterProgram !== null && student !== null) {
      await this.prisma.masterProgramLike.create({
        data: {
          studentId: student.id,
          masterProgramId: masterProgram.id,
        },
        select: null,
      });

      return true;
    }
    return false;
  }

  public async unLikeMasterProgram(masterProgramId: number, studentId: number): Promise<boolean> {
    const toDelete = await this.prisma.masterProgramLike.findMany({
      where: {
        studentId,
        masterProgramId,
      },
    });

    const deletedLike = await this.prisma.masterProgramLike.delete({
      where: {
        id: toDelete[0].id,
      },
    });

    if (deletedLike !== null) {
      return true;
    }
    return false;
  }

  public async commentMasterProgram(commentRequest: CommentRequest): Promise<boolean> {
    const masterProgram = await this.prisma.masterProgram.findUnique({
      where: { id: commentRequest.masterProgramId },
    });

    const student = await this.prisma.student.findUnique({
      where: { id: commentRequest.studentId },
    });

    if (masterProgram !== null && student !== null) {
      await this.prisma.masterProgramComment.create({
        data: {
          comment: commentRequest.comment,
          studentId: student.id,
          masterProgramId: masterProgram.id,
        },
        select: null,
      });

      return true;
    }
    return false;
  }

  public async unCommentMasterProgram(masterProgramId: number, studentId: number): Promise<boolean> {
    const toDelete = await this.prisma.masterProgramComment.findMany({
      where: {
        studentId,
        masterProgramId,
      },
    });

    const deletedComment = await this.prisma.masterProgramComment.delete({
      where: {
        id: toDelete[0].id,
      },
    });

    if (deletedComment !== null) {
      return true;
    }
    return false;
  }

  public async applyMasterProgram(masterProgramId: number, studentId: number): Promise<boolean> {
    const masterProgram = await this.prisma.masterProgram.findUnique({
      where: { id: masterProgramId },
    });

    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (masterProgram !== null && student !== null) {
      if (masterProgram.universityId === null) {
        return false;
      }

      await this.prisma.quickApplication.create({
        data: {
          studentId: student.id,
          masterProgramId: masterProgram.id,
          universityId: masterProgram.universityId,
        },
        select: null,
      });

      return true;
    }
    return false;
  }

  public async unApplyMasterProgram(masterProgramId: number, studentId: number): Promise<boolean> {
    const toDelete = await this.prisma.quickApplication.findMany({
      where: {
        studentId,
        masterProgramId,
      },
    });

    const deletedApplication = await this.prisma.quickApplication.delete({
      where: {
        id: toDelete[0].id,
      },
    });

    if (deletedApplication !== null) {
      return true;
    }
    return false;
  }

  public async getLikesForMasterProgram(masterProgramId: number): Promise<MasterProgramLike[]> {
    const likes = await this.prisma.masterProgramLike.findMany({
      where: {
        masterProgramId,
      },
    });

    return likes;
  }

  public async getCommentsForMasterProgram(masterProgramId: number): Promise<MasterProgramComment[]> {
    const comments = await this.prisma.masterProgramComment.findMany({
      where: {
        masterProgramId,
      },
    });

    return comments;
  }
}
