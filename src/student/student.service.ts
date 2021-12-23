import { Injectable } from '@nestjs/common';
import {
  MasterProgramComment, MasterProgramLike, Role, Student, User,
} from '@prisma/client';
import { MasterProgramsService } from '../master-programs/master-programs.service';
import { MasterProgramResponse } from '../master-programs/models';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly masterProgramService: MasterProgramsService,
  ) {

  }

  public async getStudentById(id: number) : Promise<Student | null> {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  public async getAllStudents(page: number, limit: number): Promise<Student[] | null> {
    return this.prisma.student.findMany({
      skip: page,
      take: limit,
    });
  }

  public async getLikesForStudent(studentId: number): Promise<MasterProgramLike[]> {
    const likes = await this.prisma.masterProgramLike.findMany({
      where: {
        studentId,
      },
    });

    return likes;
  }

  public async getCommentsForStudent(studentId: number): Promise<MasterProgramComment[]> {
    const comments = await this.prisma.masterProgramComment.findMany({
      where: {
        studentId,
      },
    });

    return comments;
  }

  public async applyMasterProgram(user: User, masterProgramId: number): Promise<boolean> {
    if (user.role !== Role.STUDENT) {
      return false;
    }

    const masterProgram = await this.prisma.masterProgram.findUnique({
      where: { id: masterProgramId },
    });

    const student = await this.prisma.student.findUnique({
      where: { userId: user.id },
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

  public async unApplyMasterProgram(user: User, masterProgramId: number): Promise<boolean> {
    if (user.role !== Role.STUDENT) {
      return false;
    }

    const masterProgram = await this.prisma.masterProgram.findUnique({
      where: { id: masterProgramId },
    });

    const student = await this.prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (masterProgram !== null && student !== null) {
      const toDelete = await this.prisma.quickApplication.findMany({
        where: {
          studentId: student.id,
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
    }

    return false;
  }

  public async getApplications(user: User): Promise<(MasterProgramResponse | null)[] | null> {
    if (user.role !== Role.STUDENT) {
      return null;
    }

    const student = await this.prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (student !== null) {
      const applications = await this.prisma.quickApplication.findMany({
        where: {
          studentId: student.id,
        },
      });

      const promises = applications.map(async (application) => {
        const masterProgramResponse = await this.masterProgramService.getMasterProgramById(application.masterProgramId);
        return masterProgramResponse;
      });

      const masterProgramResponses : (MasterProgramResponse | null)[] = await Promise.all(promises);

      return masterProgramResponses;
    }

    return null;
  }
}
