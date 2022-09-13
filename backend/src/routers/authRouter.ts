import { Router } from 'express';

import validateSchema from './../middlewares/validateSchemaMiddleware';
import { userSchema } from '../schemas/userSchema';
import * as controller from '../controllers/authController';

const authRouter = Router();

authRouter.use(validateSchema(userSchema));
authRouter.post('/sign-up', controller.signUp);
authRouter.post('/sign-in',controller.signIn);

export default authRouter;