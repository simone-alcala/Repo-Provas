import { Router } from 'express';

import validateSchema from './../middlewares/validateSchemaMiddleware';
import validateToken from '../middlewares/validateTokenMiddleware';
import { testSchema } from './../schemas/testSchema';
import * as controller from '../controllers/testController';

const testRouter = Router();

testRouter.use(validateToken);
testRouter.post('/terms', validateSchema(testSchema), controller.insert);
testRouter.get('/terms/:disciplineId',controller.getByDisciplineId);

export default testRouter;