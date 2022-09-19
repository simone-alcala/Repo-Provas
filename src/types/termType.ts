import { Term } from '@prisma/client';

export type InsertTermType = Omit<Term, 'id'> ;
