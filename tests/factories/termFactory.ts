
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { InsertTermType } from '../../src/types/termType';

export function getNewTerm() : InsertTermType {
  return {
    number: Math.floor((Math.random() * 10000) + 1000),
  }
}

export async function insert(term: InsertTermType) {
  return await prisma.term.create({ data: term });
}

export async function getTermById(id: number) {
  return await prisma.term.findFirst({ where: { id } });
}

export async function getTermByName(number: number) {
  return await prisma.term.findFirst({ where: { number } });
}