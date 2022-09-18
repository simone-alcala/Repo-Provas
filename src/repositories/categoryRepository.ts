import prisma from '../database/config';

export async function findById(id: number) {
  return prisma.category.findUnique({ where: { id } });  
}
