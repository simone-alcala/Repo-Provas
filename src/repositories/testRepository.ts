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

export async function getTestsByDiscipline() {
  
  return prisma.term.findMany({
    include: {
      disciplines: {
        select: {
          id: true,
          name: true,          
          teachersDiscplines: {
            select: {
              tests: {
                select: {
                  category: {
                    select: {
                      name: true,
                    }
                  },
                  id: true,
                  name: true,
                  pdfUrl: true,
                  teacherDiscipline: {
                    select: {
                      teacher: {
                        select: {
                          name: true
                        }
                      }
                    }
                  }
                },
              },
            },
          }          
        },
      },
    },
  });
}

export async function getTestsByTeacher() {
  
  return prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
      teachersDisplines: {
        select: {
          tests: {
            select: {
              category: {
                select: {
                  id: true,
                  name: true
                }
              },
              id: true,
              name: true,
              pdfUrl: true,
              teacherDiscipline: {
                select: {
                  discipline: {
                    select: {
                      id: true,
                      name: true,
                    }
                  }
                }
              }
            },

          }
        }
      }
    }
  });

}




/*
export async function getTestsByTeacher() {
  
  return prisma.teacherDiscipline.findMany({
    select: {
      teacher: {
        select: {
          id: true,
          name: true,
        },
      },
      tests: {
        select: {
          category: {
            select: {
              id: true,
              name: true,
            }
          },
          id: true,
          name: true,
          pdfUrl: true,
          teacherDiscipline: {
            select: {
              discipline: {
                select: {
                  id: true,
                  name: true,
                }
              }
            }
          }
        }
      }
    }
  });
}*/