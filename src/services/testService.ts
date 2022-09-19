import { InsertTestType, CreateTestType, TestsByDiscipleType, TestsByTeachersType } from './../types/testType';
import * as repository from '../repositories/testRepository';
import * as teacherService from '../services/teacherService';
import * as disciplineService from '../services/disciplineService';
import * as categoryService from '../services/categoryService';
import * as teacherDisciplineService from '../services/teacherDisciplineService';

export async function insert(testData: CreateTestType) {
  
  await getTeacherByIdOrFail(testData.teacherId);
  await getCategoryByIdOrFail(testData.categoryId);
  await getDisciplineByIdOrFail(testData.disciplineId);

  const teacherDiscipline = await getTeacherDisciplineByIdsOrFail(testData.teacherId, testData.disciplineId);
  
  const data : InsertTestType = { 
    name: testData.name.trim().toUpperCase(),
    pdfUrl: testData.pdfUrl,
    categoryId: testData.categoryId,
    teacherDisciplineId: teacherDiscipline.id
  };
  
  return await repository.insert(data);
}

export async function getTestsByDiscipline() {
  const terms = await  repository.getTestsByDiscipline();
  const result: TestsByDiscipleType[] = [];
  terms.map( (term, indexTerm) => {
    result.push({
      id: term.id,
      number: term.number,
      disciplines: []
    });
    term.disciplines.map( (discipline, indexDiscipline) => {
      result[indexTerm].disciplines.push({
        id: discipline.id,
        name: discipline.name,
        categories: []
      });
      discipline.teachersDiscplines.map( (teacherDiscpline) => {
        teacherDiscpline.tests.map( (test) => {
          const index = result[indexTerm].disciplines[indexDiscipline].categories.findIndex(item => 
            item.category === test.category.name
          );
          const newTest = {
            id: test.id,
            name: test.name,
            pdfUrl: test.pdfUrl,
            teacher: `${test.teacherDiscipline.teacher.name}`
          };
          if (index === -1) {
            result[indexTerm].disciplines[indexDiscipline].categories.push({
              category: test.category.name,
              tests: [newTest]
            });
          } else {
            result[indexTerm].disciplines[indexDiscipline].categories[index].tests.push(
              newTest
            );
          }
        });
      });
    });
  });
  return result;
}

export async function getTestsByTeacher() {
  const teachers = await repository.getTestsByTeacher();
  const result: TestsByTeachersType[] = [];
  teachers.map( (teacher, indexTeacher) => {
    result.push({
      id: teacher.id,
      name: teacher.name,
      categories: []
    });
    teacher.teachersDisplines.map( (teacherDiscpline) => {
      teacherDiscpline.tests.map ( (test) => {
        const index = result[indexTeacher].categories.findIndex(item => 
          item.category === test.category.name
        );
        const newTest = {
          id: test.id,
          name: test.name,
          pdfUrl: test.pdfUrl,
          discipline: `(${test.teacherDiscipline.discipline.name})`
        }
        if (index === -1) {
          result[indexTeacher].categories.push({
            category: test.category.name,
            tests: [ newTest]
          })
        } else {
          result[indexTeacher].categories[index].tests.push(newTest);
        }
      });     
    });
  });
  return result;
}

async function getTeacherByIdOrFail(id: number) {
  return await teacherService.getByIdOrFail(id);
}

async function getDisciplineByIdOrFail(id: number) {
  return disciplineService.getByIdOrFail(id);
}

async function getCategoryByIdOrFail(id: number) {
  return categoryService.getByIdOrFail(id);
}

async function getTeacherDisciplineByIdsOrFail(teacherId: number, disciplineId: number) {
  return await teacherDisciplineService.getByTeacherIdAndDisciplineIdOrFail(teacherId, disciplineId);
}


