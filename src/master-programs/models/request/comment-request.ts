import {
  IsNotEmpty,
} from 'class-validator';

export class CommentRequest {
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  masterProgramId: number;

  @IsNotEmpty()
  comment: string;
}
