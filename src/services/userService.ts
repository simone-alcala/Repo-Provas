import loadEnv from '../config/envs';
import jwt from 'jsonwebtoken';

import { User } from '@prisma/client';
import * as throwError from '../utils/errorUtils';
import * as repository from '../repositories/userRepository';

const JWT_KEY = process.env.JWT_KEY || '';

export async function isValidToken(token: string, message?: string) {
  let result: { userId: number } | undefined;
  jwt.verify(token, JWT_KEY, (error, decoded) => {
    if (error) {
      throw throwError.unauthorized(message);
    } else {
      result = decoded as { userId: number };
    }
  });
  if (result?.userId){
    const user = await getUserById(result.userId);
    if (user) {
      return result?.userId;
    }
  }
}

async function getUserByEmail(email: string) {
  return await repository.findByEmail(email);
}

async function getUserById(id: number) {
  return await repository.findById(id);
}

export async function findUserByEmailAndFail(email: string) {
  const result = await getUserByEmail(email);
  if (result) {
    throw throwError.conflict('Email already registered');
  }
}

export async function findUserByEmailOrFail(email: string, message?: string) {
  const result = await getUserByEmail(email);
  if (!result) {
    throw throwError.notFound(message || 'User not found');
  }
  return result;
}

export async function findUserByIdOrFail(id: number) {
  const result = await getUserById(id);
  if (result) {
    throw throwError.notFound('User not found');
  }
}


