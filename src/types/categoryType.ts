import { Category } from '@prisma/client';

export type InsertCategoryType = Omit<Category, 'id'> ;
