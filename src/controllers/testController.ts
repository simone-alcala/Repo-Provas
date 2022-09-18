import { Request, Response} from 'express';

import { CreateTestType } from '../types/testType';
import * as service from '../services/testService';

export async function insert(req: Request, res: Response) {
  const data : CreateTestType = req.body;
  await service.insert(data);
  res.sendStatus(201);
}

export async function getByDisciplineId(req: Request, res: Response) {
  const result = await service.getTestsByDiscipline();
  res.status(200).send(result);
}

export async function getByTeacherId(req: Request, res: Response) {
  const result = await service.getTestsByTeacher();
  res.status(200).send(result);
}