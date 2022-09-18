import { Router } from 'express';

import validateSchema from './../middlewares/validateSchemaMiddleware';
import { userSchema } from '../schemas/userSchema';
import * as controller from '../controllers/authController';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(userSchema), controller.signUp);
authRouter.post('/sign-in', validateSchema(userSchema), controller.signIn);

export default authRouter;