/**
 * Staff Routes Tests
 * - Create staff profile (staff token)
 * - Get one staff profile by userId (staff only)
 * - List staff (staff only)
 * - Delete staff profile (staff only)
 */

const request = require('supertest');
const app = require('../src/index');
const { createStaffUserAndToken } = require('./testUtils');

describe('Staff Routes: /api/v1/staff', () => {
  let staffToken;
  let staffUserId;

  beforeEach(async () => {
    const staff = await createStaffUserAndToken(app);
    staffToken = staff.token;
    staffUserId = staff.userId;
  });

  test('POST /staff creates staff profile', async () => {
    const res = await request(app)
      .post('/api/v1/staff')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({ firstName: 'Sam', lastName: 'Lee' });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.userId).toBe(staffUserId);
  });

  test('GET /staff/:userId - should return one staff profile', async () => {
    await request(app)
      .post('/api/v1/staff')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({ firstName: 'Sam', lastName: 'Lee' });

    const res = await request(app)
      .get(`/api/v1/staff/${staffUserId}`)
      .set('Authorization', `Bearer ${staffToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.firstName).toBe('Sam');
  });

  test('GET /staff - should list all staff', async () => {
    await request(app)
      .post('/api/v1/staff')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({ firstName: 'Sam', lastName: 'Lee' });

    const res = await request(app)
      .get('/api/v1/staff')
      .set('Authorization', `Bearer ${staffToken}`);

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  test('DELETE /staff/:userId - should delete a staff profile', async () => {
    await request(app)
      .post('/api/v1/staff')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({ firstName: 'Sam', lastName: 'Lee' });

    const res = await request(app)
      .delete(`/api/v1/staff/${staffUserId}`)
      .set('Authorization', `Bearer ${staffToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
