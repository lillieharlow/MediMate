/**
 * Auth Routes Tests
 *
 * Tests signup and login endpoints:
 * - New user registration (success)
 * - User login (success)
 */

const request = require('supertest');
const app = require('../src/index');
const { testData } = require('./setupMongo');

describe('Auth Routes: Signup and login for /api/v1/auth', () => {
  const { email, password } = testData.validUser;

  test('POST /signup - should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email,
        password,
        ...testData.validPatient,
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.userId).toBeDefined();
  });

  test('POST /login - should login an existing user', async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({ email, password, ...testData.validPatient });
    const res = await request(app).post('/api/v1/auth/login').send({ email, password });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
  });
});
