import { TeacherDiscipline } from '@prisma/client';

export type InsertTeacherDisciplineType = Omit<TeacherDiscipline, 'id'> ;
