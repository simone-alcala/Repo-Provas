import { Request, Response} from 'express';

import { CreateTestType } from '../types/testType';
import * as service from '../services/testService';

export async function insert(req: Request, res: Response) {
  const data : CreateTestType = req.body;
  await service.insert(data);
  res.sendStatus(201);
}

export async function getByDisciplineId(req: Request, res: Response) {
  const { disciplineId } = req.params;
  const result = await service.getByDisciplineId(disciplineId);
  res.status(200).send(result);
}