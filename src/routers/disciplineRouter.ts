import { Router } from 'express';

import * as controller from '../controllers/disciplineController';
import validateToken from '../middlewares/validateTokenMiddleware';

const disciplineRouter = Router();

disciplineRouter.get('/disciplines', validateToken, controller.getAll);

export default disciplineRouter;