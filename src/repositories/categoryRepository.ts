import prisma from '../database/config';

export async function findById(id: number) {
  return prisma.category.findUnique({ where: { id } });  
}

export async function findAll() {
  return prisma.category.findMany({
    select: {
      id: true,
      name: true,
    }
  });  
}
