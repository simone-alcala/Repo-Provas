import prisma from '../database/config';

export async function findById(id: number) {
  return prisma.teacher.findUnique({ where: { id } });  
}
