import { IsNotEmpty, MinLength } from 'class-validator';

export class UniversityLoginRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
