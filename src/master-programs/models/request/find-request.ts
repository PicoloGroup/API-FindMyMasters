import { Field, Mode } from '@prisma/client';

export class FindMasterProgramRequest {
  duration: number;

  language: string;

  mode: Mode;

  deadline: Date;

  field: Field;

  tution_currency: string;
}
