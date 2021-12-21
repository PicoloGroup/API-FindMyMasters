import { Injectable } from '@nestjs/common';
import { MasterProgramComment, MasterProgramLike, Student } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
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
}
