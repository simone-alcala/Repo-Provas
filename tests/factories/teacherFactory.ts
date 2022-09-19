
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { InsertTeacherType } from '../../src/types/teacherType';


export function getNewTeacher() : InsertTeacherType {
  return {
    name: faker.name.firstName(),
  }
}

export async function insert(teacher: InsertTeacherType) {
  const data = {
    ...teacher,
    name: teacher.name.toUpperCase()
  }
  return await prisma.teacher.create({ data });
}

export async function getTeacherById(id: number) {
  return await prisma.teacher.findFirst({ where: { id } });
}

export async function getTeacherByName(name: string) {
  return await prisma.teacher.findFirst({ where: { name } });
}

export async function getAll() {
  return await prisma.teacher.findMany();
}