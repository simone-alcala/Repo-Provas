import app from '../src/app';
import supertest from 'supertest';
import prisma from '../src/database/config';
import * as factory from './factories/testFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests`;
});

const agent = supertest(app);

describe('Tests Suite Tests', () => {

  it('Should create a test and return status code 201', async () => {
    const test = factory.getNewTest();
    const response = await agent.post('/tests').send(test);
    const testCreated = await factory.getTestById(response.body.testId);
    expect(response.status).toBe(201);
    expect(response.body.testId).toBeTruthy();
    expect(testCreated.length).toBe(1);
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});