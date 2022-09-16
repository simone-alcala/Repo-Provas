import { Test } from '@prisma/client';

//export type CreateTestType = Omit<Test, 'id'>;

export type InsertTestType = Omit<Test, 'id'> 

export type CreateTestType = Omit<Test, 'id' | 'teacherDisciplineId'> & {
  teacherId: number,
  disciplineId: number
};

