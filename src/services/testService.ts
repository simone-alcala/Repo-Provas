import { InsertTestType, CreateTestType } from './../types/testType';
import { Test } from '@prisma/client';
import * as throwError from '../utils/errorUtils';
import * as repository from '../repositories/testRepository';

import * as teacherService from '../services/teacherService';
import * as disciplineService from '../services/disciplineService';
import * as teacherDisciplineService from '../services/teacherDisciplineService';

export async function insert(testData: CreateTestType) {
  const data : InsertTestType = { 
    ...testData, 
    name: testData.name.trim().toUpperCase(),
    teacherDisciplineId: 0
  };
  return await repository.insert(data);
}

async function getTeacherById(id: number) {
  return teacherService.getById(id);
}

async function getDisciplineById(id: number) {
  return disciplineService.getById(id);
}

async function getTeacherDisciplineByTeacherIdAndDisciplineId(teacherId: number, disciplineId: number) {
  return teacherDisciplineService.getByTeacherIdAndDisciplineId(teacherId, disciplineId);
}

export async function getByDisciplineId(id: string) {
  const disciplineId = Number(id);
  return await repository.findByIdWithChildren(disciplineId);
}