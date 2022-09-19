import { Teacher } from '@prisma/client';

export type InsertTeacherType = Omit<Teacher, 'id'> ;
