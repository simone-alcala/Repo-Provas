import { Category } from '@prisma/client';
import * as throwError from '../utils/errorUtils';
import * as repository from '../repositories/categoryRepository';

export async function getByIdOrFail (id: number) {
  const result = await repository.findById(id);
  if (!result) {
    throw throwError.notFound('Category ID not found');
  }
  return result;
}

export async function findAll(){
  return await repository.findAll();
}