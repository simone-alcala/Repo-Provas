import app from '../src/app';
import supertest from 'supertest';
import prisma from '../src/database/config';
import * as factory from './factories/userFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE  users`;
});

const agent = supertest(app);

describe('Authentication Suite Tests', () => {
  
  it('Should sign up successfully and return status code 201 and persiste user', async () => {
    const user = factory.getNewUser();
    const response = await agent.post('/sign-up').send(user);
    const userCreated = await factory.getUserByEmail(user.email);
    expect(response.status).toBe(201);
    expect(userCreated.length).toBe(1);
  });

  it('Should sign up successfully and return status code 201 and encrypt password', async () => {
    const user = factory.getNewUser();
    const response = await agent.post('/sign-up').send(user);
    const userCreated = await factory.getUserByEmail(user.email);
    const matchPassword = factory.comparePassword(user.password, userCreated[0].password);
    expect(response.status).toBe(201);
    expect(matchPassword).toBe(true);
  });
  
  it('Should not sign up and return status code 409', async () => {
    const user = factory.getNewUser();
    factory.insert(user);
    const response = await agent.post('/sign-up').send(user);
    const userCreated = await factory.getUserByEmail(user.email);
    expect(response.status).toBe(409);
    expect(userCreated.length).toBe(1);
  })

  it('Should not sign up and return status code 422', async () => {
    const user = factory.getNewUser();
    const response = await agent.post('/sign-up').send({...user, email: 'test' });
    const userCreated = await factory.getUserByEmail(user.email.toLowerCase());
    expect(response.status).toBe(422);
    expect(userCreated.length).toBe(0);
  })

  it('Should sign in successfully and return status code 200', async () => {
    const user = factory.getNewUser();
    await factory.insert(user);
    const response = await agent.post('/sign-in').send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  })

  it('Should sign in successfully and return a valid token', async () => {
    const user = factory.getNewUser();
    await factory.insert(user);
    const response = await agent.post('/sign-in').send(user);
    const result = factory.validateToken(response.body.token);
    expect(result).toBeTruthy();
  })

  it('Should not sign in and return return status code 404 for user not registered', async () => {
    const user = factory.getNewUser();
    const response = await agent.post('/sign-in').send(user);
    expect(response.status).toBe(404);
  })

  it('Should not sign in and return return status code 404 for invalid password', async () => {
    const user = factory.getNewUser();
    const user2 = factory.getNewUser();
    await factory.insert(user);
    const response = await agent.post('/sign-in').send({ email: user.email, password: user2.password });
    expect(response.status).toBe(404);
  })

  it('Should not sign in and return return status code 422', async () => {
    const user = factory.getNewUser();
    const response = await agent.post('/sign-in').send({ email: 'test', password: user.password });
    expect(response.status).toBe(422);
  })

})

afterAll(async () => {
  await prisma.$disconnect();
});