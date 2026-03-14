/**
 * Test Setup: Global infastructure (DB, config) for tests.
 *
 * Spins up a temporary MongoDB instance for each test run.
 * Database gets dropped and seeded before each test.
 *
 * Sets JWT_SECRET=test-secret for auth route tests.
 */

const path = require('node:path');
const mongoose = require('mongoose');
const { seedUserTypes } = require('../src/utils/seedDatabase');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: path.resolve(__dirname, '../.env.test') });

beforeAll(async () => {
  // JWT_SECRET and other env vars are now loaded from .env.test
  await mongoose.connect(process.env.MONGODB_URI);
});
beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await seedUserTypes();
});
afterAll(async () => {
  await mongoose.disconnect();
});

const testData = {
  validUser: {
    email: 'test@example.com',
    password: 'password123',
  },
  patientUser: {
    email: 'patient@example.com',
    password: 'password123',
  },
  staffUser: {
    email: 'staff@example.com',
    password: 'password123',
  },
  doctorUser: {
    email: 'doctor@example.com',
    password: 'password123',
  },
  validPatient: {
    firstName: 'Alice',
    lastName: 'Smith',
    dateOfBirth: '1990-05-15',
    phone: '1234567890',
  },
  validDoctor: {
    shiftStartTime: '08:00',
    shiftEndTime: '16:00',
    firstName: 'John',
    lastName: 'Doctor',
  },
};

module.exports = { testData };
