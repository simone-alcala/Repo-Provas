
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { CreateTestType, InsertTestType } from '../../src/types/testType';

export function getNewTest() : CreateTestType {
  return {
    name: faker.name.firstName(),
    pdfUrl: faker.internet.url(),
    categoryId: 0,
    teacherId: 0,
    disciplineId: 0
  }
}

export async function insert(test: InsertTestType) {
  const data = {
    ...test,
    name: test.name.toUpperCase()
  }
  return await prisma.test.create({ data });
}

export async function getTestById(id: number) {
  return await prisma.test.findMany({ where: { id } });
}