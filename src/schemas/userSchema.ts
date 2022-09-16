import Joi from 'joi';
import prisma from '../../src/database/config';
import { CreateUserType } from '../types/userType';

export const userSchema = Joi.object<CreateUserType>({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(4).required(),
});

