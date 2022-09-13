import prisma from '../database/config';

import { CreateUserType } from '../types/userType';

export async function insert(data: CreateUserType) {
  return prisma.user.create({ data });  
}

export async function findById(id: number) {
  return prisma.user.findUnique({ where: { id } });  
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });  
}
