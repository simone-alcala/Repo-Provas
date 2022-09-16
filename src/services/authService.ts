import loadEnv from '../../src/config/envs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as service from './userService';
import { CreateUserType } from '../types/userType';
import * as repository from '../repositories/userRepository';
import * as throwError from './../utils/errorUtils';

const SALTROUNDS = Number(process.env.BCRYPT) || 10;
const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION);
const JWT_KEY = process.env.JWT_KEY || '';

export async function SignUp(userData: CreateUserType) {
  const data = { 
    ...userData, 
    email: userData.email.trim().toLowerCase(),
    password: getEncryptedPassword(userData.password.trim()),  
  };
  await service.findUserByEmailAndFail(data.email);
  return await repository.insert(data);
}

export async function SignIn(userData: CreateUserType) {
  const errorMessage = 'Invalid user/password';
  const data = { 
    ...userData, 
    email: userData.email.trim().toLowerCase(),
    password: userData.password.trim()  
  };
  const user = await service.findUserByEmailOrFail(data.email, errorMessage);
  validPasswordOrFail(data.password, user.password, errorMessage);
  return { token: getToken(user.id) };
}

function getEncryptedPassword(password: string) {
  return bcrypt.hashSync(password, SALTROUNDS);
}

export function validPasswordOrFail(password: string, hashedPassword: string, message: string) {
  const match = bcrypt.compareSync(password, hashedPassword);
  if (!match) {
    throw throwError.notFound(message);
  }
}

function getToken(id: number) {
  return jwt.sign({ userId: id }, JWT_KEY, { expiresIn: JWT_EXPIRATION });
}