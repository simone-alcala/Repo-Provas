import { Router } from 'express';

import validateSchema from './../middlewares/validateSchemaMiddleware';
import validateToken from '../middlewares/validateTokenMiddleware';
import { testSchema } from './../schemas/testSchema';
import * as controller from '../controllers/testController';

const testRouter = Router();

testRouter.post('/tests', validateToken, validateSchema(testSchema), controller.insert);
testRouter.get('/tests/discipline', validateToken, controller.getByDisciplineId);
testRouter.get('/tests/teacher', validateToken, controller.getByTeacherId);

export default testRouter;