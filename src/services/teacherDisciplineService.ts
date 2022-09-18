import { TeacherDiscipline } from '@prisma/client';
import * as throwError from '../utils/errorUtils';
import * as repository from '../repositories/teacherDisciplineRepository';

export async function getByTeacherIdAndDisciplineIdOrFail (teacherId: number, disciplineId: number) {
  const result = await repository.findById(teacherId, disciplineId);
  if (!result) {
    throw throwError.notFound('Teacher/Discpline relation not found');
  }
  return result;
}