import { Router } from 'express';

import authRouter from './authRouter';
import testRouter from './testRouter';
import userRouter from './userRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(testRouter);

export default router;