
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { InsertCategoryType } from '../../src/types/categoryType';


export function getNewCategory() : InsertCategoryType {
  return {
    name: faker.color.space(),
  }
}

export async function insert(category: InsertCategoryType) {
  const data = {
    name: category.name.toUpperCase()
  }
  return await prisma.category.create({ data });
}

export async function getCategoryById(id: number) {
  return await prisma.category.findFirst({ where: { id } });
}

export async function getCategoryByName(name: string) {
  return await prisma.category.findFirst({ where: { name } });
}

export async function getAll() {
  return await prisma.category.findMany();
}