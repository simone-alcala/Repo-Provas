import { Request, Response} from 'express';

import { findAll } from '../services/teacherService';

export async function getAll(req: Request, res: Response) {
  const result = await findAll();
  res.status(200).send(result);
}
