import { jest } from '@jest/globals';

// Step 1. mock first
const db = { query: jest.fn() };

jest.unstable_mockModule('../../connect.js', () => ({ db }));

jest.mock('bcrypt', () => ({
  compareSync: jest.fn(() => true)
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-jwt-token')
}));

// Step 2. dynamically import AFTER mocks
const { login } = await import('../../controllers/authController.js');

function createRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };
}

describe('authController.login', () => {
  test('successful login sets cookie and returns token + user data', async () => {
    const req = { body: { username: 'alice', password: 'secret', role: 'users' } };
    const res = createRes();

    const fakeUser = [{ id: 1, username: 'alice', password: 'hashed', email: 'a@b.c' }];
    db.query.mockImplementationOnce((sql, params, cb) => cb(null, fakeUser));

    await login(req, res);

    expect(db.query).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith("accessToken", 'fake-jwt-token', expect.any(Object));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: true,
      message: "Login successful",
    }));
  });

  test('wrong password returns 401', async () => {
    const req = { body: { username: 'alice', password: 'wrong', role: 'users' } };
    const res = createRes();

    const bcrypt = await import('bcrypt');
    bcrypt.compareSync.mockReturnValueOnce(false);

    const fakeUser = [{ id: 1, username: 'alice', password: 'hashed' }];
    db.query.mockImplementationOnce((sql, params, cb) => cb(null, fakeUser));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ status: false, message: "Wrong password." });
  });

  test('db error returns 500', async () => {
    const req = { body: { username: 'alice', password: 'secret', role: 'users' } };
    const res = createRes();

    db.query.mockImplementationOnce((sql, params, cb) => cb(new Error('DB fail'), null));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: false, message: "Database error." });
  });
});
