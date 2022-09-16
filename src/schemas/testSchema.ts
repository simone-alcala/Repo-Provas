import Joi from 'joi';
import { CreateTestType } from './../types/testType';

export const testSchema = Joi.object<CreateTestType>({
  name: Joi.string().trim().email().required(),
  pdfUrl: Joi.string().trim().min(4).required(),
  categoryId: Joi.number().integer().required(),
  teacherId: Joi.number().integer().required(),
  disciplineId: Joi.number().integer().required(),
});

