import app from '../src/app';
import supertest from 'supertest';
import prisma from '../src/database/config';

import * as factory from './factories/testFactory';
import * as userFactory from './factories/userFactory';
import { insert } from './factories/categoryFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
});

const agent = supertest(app);

describe('Tests Suite Tests', () => {

  it('Should create a test and return status code 201', async () => {
    const user =  await userFactory.insert(userFactory.getNewUser());
    const token = userFactory.getToken(user.id);
    const newTest = await factory.getNewTest();
    const response = await agent.post('/tests').send(newTest).set('Authorization', `Bearer ${token}`);   
    const testCreated = await factory.getTestById(response.body.testId);
    expect(response.status).toBe(201);
    expect(testCreated.length).toBe(1);
  });

  it('Should return tests by discipline and return status code 200', async () => {
    const user =  await userFactory.insert(userFactory.getNewUser());
    const token = userFactory.getToken(user.id);   
    await insert(await factory.getNewTest());   
    const resultExpected = await factory.testsByDiscipline();
    const response = await agent.get('/tests/discipline').set('Authorization', `Bearer ${token}`);   
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(resultExpected);
  });

  it('Should return tests by teacher and return status code 200', async () => {
    const user =  await userFactory.insert(userFactory.getNewUser());
    const token = userFactory.getToken(user.id);   
    await insert(await factory.getNewTest());   
    const resultExpected = await factory.testsByTeacher();
    const response = await agent.get('/tests/teacher').set('Authorization', `Bearer ${token}`);   
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(resultExpected);
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});