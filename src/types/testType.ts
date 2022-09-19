import { Test } from '@prisma/client';

export type InsertTestType = Omit<Test, 'id'> 

export type CreateTestType = Omit<Test, 'id' | 'teacherDisciplineId'> & {
  teacherId: number,
  disciplineId: number
};


export type TestsByDiscipleType = {
  id: number,
  number: number,
  disciplines: DiscipleneType[]
}

type DiscipleneType = {
  id: number,
  name: string,
  categories: CategoryTypeWithTeacher[]
}

type CategoryTypeWithTeacher = {
  category: string,
  tests: TestTypeWithTeacher[]
}

type TestTypeWithTeacher = {
  id: number,
  name: string,
  pdfUrl: string,
  teacher: string
}

export type TestsByTeachersType = {
  id: number,
  name: string,
  categories: CategoryTypeWithDiscipline[]
}

type CategoryTypeWithDiscipline = {
  category: string,
  tests: TestTypeWithDiscipline[]
}

type TestTypeWithDiscipline = {
  id: number,
  name: string,
  pdfUrl: string,
  discipline: string
}