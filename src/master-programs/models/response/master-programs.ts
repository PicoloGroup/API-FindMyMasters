import { MasterProgram, MasterProgramComment } from '@prisma/client';

export class MasterProgramResponse {
  masterProgram: MasterProgram;

  comments: MasterProgramComment[];

  likes : number;

  constructor(masterProgram: MasterProgram, comments: MasterProgramComment[], likes: number) {
    this.masterProgram = masterProgram;
    this.comments = comments;
    this.likes = likes;
  }
}
