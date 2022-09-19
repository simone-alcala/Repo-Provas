import { Router } from 'express';

import * as controller from '../controllers/teacherController';
import validateToken from '../middlewares/validateTokenMiddleware';

const teacherRouter = Router();

teacherRouter.get('/teachers', validateToken, controller.getAll);

export default teacherRouter;