import prisma from '../database/config';

export async function findById(id: number) {
  return prisma.discipline.findUnique({ where: { id } });  
}

export async function findAllWithTerms() {
  return prisma.discipline.findMany({
    include: {
      term: true,
    }
  });  
}

export async function findAll() {
  return prisma.discipline.findMany({
    select: {
      id: true,
      name: true,
    }
  });  
}

