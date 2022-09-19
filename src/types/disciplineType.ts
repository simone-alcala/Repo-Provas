import { Discipline } from '@prisma/client';

export type InsertDisciplineType = Omit<Discipline, 'id'> ;
