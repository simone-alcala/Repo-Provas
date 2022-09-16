import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import loadEnv from '../../src/config/envs';
import prisma from '../../src/database/config';
import { CreateUserType } from '../../src/types/userType';

const SALTROUNDS = Number(process.env.BCRYPT) || 10;
const JWT_EXPIRATION = Number(process.env.JWT_EXPIRATION);
const JWT_KEY = process.env.JWT_KEY || '';

export async function insert(user: CreateUserType) {
  const data = {
    ...user,
    email: user.email.toLowerCase(),
    password: bcrypt.hashSync(user.password, SALTROUNDS)
  }
  return await prisma.user.create({ data });
}

export function getNewUser() : CreateUserType {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(4),
  }
}

export async function getUserById(id: number) {
  return await prisma.user.findFirst({ where: { id }});
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findMany({ where: { email: email.toLowerCase() }});
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function getToken(id: number) {
  return jwt.sign({ userId: id }, JWT_KEY, { expiresIn: JWT_EXPIRATION });
}

export function validateToken(token: string) {
  let result: { userId: number } | undefined;
  jwt.verify(token, JWT_KEY, (error, decoded) => {
    result = decoded as { userId: number };
  });
  return result?.userId;
}