import { Request, Response} from 'express';

import { CreateUserType } from '../types/userType';
import * as authService from '../services/authService';

export async function signUp(req: Request, res: Response) {
  const { email, password } : CreateUserType = req.body;
  await authService.SignUp({ email, password });
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password } : CreateUserType = req.body;
  const token = await authService.SignIn({ email, password });
  res.status(200).send(token);
}