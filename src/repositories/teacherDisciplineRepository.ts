import prisma from '../database/config';

export async function findById(teacherId: number, disciplineId: number) {
  return prisma.teacherDiscipline.findFirst({ where: { teacherId, disciplineId } });  
}
