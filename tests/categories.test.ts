import app from '../src/app';
import supertest from 'supertest';
import prisma from '../src/database/config';
import * as factory from './factories/categoryFactory';
import * as userFactory from './factories/userFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE categories CASCADE;`;
});

const agent = supertest(app);

describe('Tests Suite Tests', () => {

  it('Should return all categories', async () => {
    const user =  await userFactory.insert(userFactory.getNewUser());
    const token = userFactory.getToken(user.id);
    await factory.insert(factory.getNewCategory());
    const response = await agent.get('/categories').set('Authorization', `Bearer ${token}`);   
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});