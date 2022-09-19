import { Router } from 'express';

import authRouter from './authRouter';
import categoryRouter from './categoryRouter';
import disciplineRouter from './disciplineRouter';
import teacherRouter from './teacherRouter';
import testRouter from './testRouter';
import userRouter from './userRouter';

const router = Router();
router.use(authRouter);
router.use(userRouter);
router.use(testRouter);
router.use(categoryRouter);
router.use(disciplineRouter);
router.use(teacherRouter);

export default router;