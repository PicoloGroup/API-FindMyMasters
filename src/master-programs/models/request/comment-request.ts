import {
  IsNotEmpty,
} from 'class-validator';

export class CommentRequest {
  @IsNotEmpty()
  masterProgramId: number;

  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  comment: string;
}
