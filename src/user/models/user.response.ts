import type { User } from '@prisma/client';

export class UserResponse {
  id: number;

  email: string | null;

  username: string | null;

  emailVerified: boolean;

  registrationDate: Date; // ISO Date

  static fromUserEntity(entity: User): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;
    response.email = entity.email;
    response.username = entity.username;
    response.emailVerified = entity.emailVerified;
    response.registrationDate = entity.registrationDate;
    return response;
  }
}
