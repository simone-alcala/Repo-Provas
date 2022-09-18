import { Request, Response} from 'express';

import { isValidToken } from '../services/userService';

export async function validateToken(req: Request, res: Response) {
  const { token }  = req.body; 
  await isValidToken(token);
  res.sendStatus(200);
}
