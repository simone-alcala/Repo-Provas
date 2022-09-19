import { Router } from 'express';

import * as controller from '../controllers/categoryController';
import validateToken from '../middlewares/validateTokenMiddleware';

const categoryRouter = Router();

categoryRouter.get('/categories', validateToken, controller.getAll);

export default categoryRouter;