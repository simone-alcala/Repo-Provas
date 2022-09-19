
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { getTestsByDiscipline, getTestsByTeacher } from '../../src/services/testService';
import { CreateTestType, InsertTestType } from '../../src/types/testType';

import * as category from './categoryFactory';
import * as teacherDiscipline from './teacherDisciplineFactory';

export async function getNewTest() : Promise<CreateTestType> {

  const newCategory = await category.insert(category.getNewCategory());
  const newTeacherDiscipline = await teacherDiscipline.insert(await teacherDiscipline.getNewTeacherDiscipline());
  return {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryId: newCategory.id,
    teacherId: newTeacherDiscipline.teacherId,
    disciplineId: newTeacherDiscipline.disciplineId
  }
}

export async function insert(test: CreateTestType) {
  const teacherDisciplineCreated = await teacherDiscipline.getTeacherDisciplineByIds(test.teacherId, test.disciplineId);
  const data: InsertTestType = {
    name: test.name.toUpperCase(),
    categoryId: test.categoryId,
    pdfUrl: test.pdfUrl,
    teacherDisciplineId: Number(teacherDisciplineCreated?.id),
  }
  return await prisma.test.create({ data });
}

export async function getTestById(id: number) {
  return await prisma.test.findMany({ where: { id } });
}

export async function testsByDiscipline() {
  return await getTestsByDiscipline();
}

export async function testsByTeacher() {
  return await getTestsByTeacher();
}