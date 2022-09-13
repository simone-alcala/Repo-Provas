import { User } from '@prisma/client';

export type CreateUserType = Omit<User, 'id'>;