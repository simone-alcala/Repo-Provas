
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { InsertTeacherDisciplineType } from '../../src/types/teacherDisciplineType';

import * as teacher from './teacherFactory';
import * as discipline from './disciplineFactory';

export async function getNewTeacherDiscipline() : Promise<InsertTeacherDisciplineType> {
  const newTeacher = await teacher.insert(teacher.getNewTeacher());
  const newDiscipline = await discipline.insert(await discipline.getNewDiscipline());
  return {
    teacherId: newTeacher.id,
    disciplineId: newDiscipline.id
  }
}

export async function insert(teacherDiscipline: InsertTeacherDisciplineType) {
  return await prisma.teacherDiscipline.create({ data: teacherDiscipline });
}

export async function getTeacherDisciplineById(id: number) {
  return await prisma.teacherDiscipline.findFirst({ where: { id } });
}

export async function getTeacherDisciplineByIds(teacherId: number, disciplineId: number) {
  return await prisma.teacherDiscipline.findFirst({ where: { teacherId, disciplineId } });
}