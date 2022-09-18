import { Router } from 'express';

import * as controller from '../controllers/userController';

const userRouter = Router();

userRouter.post('/token', controller.validateToken);

export default userRouter;