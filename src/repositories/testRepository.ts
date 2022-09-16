import prisma from '../database/config';

import { InsertTestType } from '../types/testType';

export async function insert(data: InsertTestType) {
  return prisma.test.create({ data });  
}

export async function findById(id: number) {
  return prisma.test.findUnique({ where: { id } });  
}

export async function findByIdWithChildren(id: number) {
  return prisma.test.findUnique({ 
    where: { id } ,
    include: {
      category: true,
      teacherDiscipline: true
    }
  });  
}
