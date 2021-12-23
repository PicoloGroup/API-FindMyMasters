import {
  IsNotEmpty,
} from 'class-validator';

export class LikeRequest {
  @IsNotEmpty()
  masterProgramId: number;

  @IsNotEmpty()
  studentId: number;
}
