import { Role } from '.prisma/client';
import { AuthUser } from '../../src/auth/auth-user';

export const mockUser = (fields?: Partial<AuthUser>): AuthUser => ({
  registrationDate: new Date(),
  email: 'ftamur@ku.edu.tr',
  username: null,
  role: Role.STUDENT,
  id: 1,
  emailVerified: true,
  passwordHash: 'passwordHash',
  ...fields,
});
