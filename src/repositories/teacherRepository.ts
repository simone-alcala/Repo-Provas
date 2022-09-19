import prisma from '../database/config';

export async function findById(id: number) {
  return prisma.teacher.findUnique({ where: { id } });  
}

export async function findAll() {
  return prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
    }
  });  
}
