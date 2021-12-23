import { IsNotEmpty } from 'class-validator';

export class UniversityLoginRequest {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
