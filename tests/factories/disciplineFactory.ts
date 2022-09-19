
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { InsertDisciplineType } from '../../src/types/disciplineType';

import * as term from './termFactory';

export async function getNewDiscipline() : Promise<InsertDisciplineType> {
  const newTerm = await term.insert(term.getNewTerm());
  return {
    name: faker.name.firstName(),
    termId: newTerm.id,
  }
}

export async function insert(discipline: InsertDisciplineType) {
  const data = {
    ...discipline,
    name: discipline.name.toUpperCase()
  }
  return await prisma.discipline.create({ data });
}

export async function getDisciplineById(id: number) {
  return await prisma.discipline.findFirst({ where: { id } });
}

export async function getDisciplineByName(name: string) {
  return await prisma.discipline.findFirst({ where: { name } });
}

export async function getAll() {
  return await prisma.discipline.findMany();
}