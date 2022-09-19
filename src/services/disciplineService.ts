import { Discipline } from '@prisma/client';
import * as throwError from '../utils/errorUtils';
import * as repository from '../repositories/disciplineRepository';


export async function getByIdOrFail (id: number) {
  const result = await repository.findById(id);
  if (!result) {
    throw throwError.notFound('Discipline ID not found');
  }
  return result;
}

export async function findAll(){
  return await repository.findAll();
}