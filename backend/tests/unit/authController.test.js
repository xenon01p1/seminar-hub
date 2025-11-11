import { describe, expect, jest } from '@jest/globals';

// Step 1. mock first
const db = { query: jest.fn() };

jest.unstable_mockModule('../../connect.js', () => ({ db }));

jest.mock('bcrypt', () => ({
  compareSync: jest.fn(() => true),
  genSaltSync: jest.fn(() => 'fake-salt'),
  hashSync: jest.fn(() => 'fake-hash'),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-jwt-token')
}));

// Step 2. dynamically import AFTER mocks
const { login, registerUser } = await import('../../controllers/authController.js');

function createRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };
}

// To silence the expected error display
beforeAll(() => {
  jest.clearAllMocks(); // clear leftover mock state
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

// ==== LOGIN TEST =====================
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


function createRegisterRes() {
  return{
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  }
}

// ==== REGISTER TEST =====================
describe('authController.register', () => {
  test('Username is empty error', async() => {
    const req = { body: { username: '', password: 'secret', email: 'alice@gmail.com' }};
    const res = createRegisterRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: false, message: "Username is empty or undefined." })
  });

  test('Password is empty error', async() => {
    const req = { body: { username: "Alice", password: "", email: 'alice@gmail.com' }};
    const res = createRegisterRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: false, message: "Password is empty or undefined." });
  });

  test('Email is empty error', async() => {
    const req = { body: { username: "Alice", password: "secret", email: '' }};
    const res = createRegisterRes();

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: false, message: "Email is empty or undefined." });
  });

  test('Error DB searching user', async () => {
    const req = { body: { username: "Alice", password: "secret", email: "Alice@gmail.com" } };
    const res = createRegisterRes();

    const mockError = new Error('Error searching user');
    db.query.mockImplementationOnce((sql, params, cb) => cb(mockError, null));

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: mockError
    });
  });

  test('User already exists error', async () => {
    const req = { body: { username: "Alice", password: "secret", email: "alice@gmail.com" } };
    const res = createRegisterRes();

    // returning a data triggers if (data.length) return res.status(409)
    db.query.mockImplementationOnce((sql, params, cb) => cb(null, [{ id: 1, username: "Alice" }]));

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: "User already exists."
    });
  });

  test('Register DB error', async() => {
    const req = { body: { username: "Alice", password: "secret", email: "Alice@gmail.com" }};
    const res = createRegisterRes();

    const mockError = new Error('Error register user');

    db.query
      .mockImplementationOnce((sql, params, cb) => cb(null, []))
      .mockImplementationOnce((sql, params, cb) => cb(mockError, null));

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: mockError
    });
  });

  test('Register successfull', async() => {
    const req = { body: { username: "Alice", password: "secret", email: "Alice@gmail.com" }};
    const res = createRegisterRes();

    db.query
      .mockImplementationOnce((sql, params, cb) => cb(null, []))
      .mockImplementationOnce((sql, params, cb) => cb(null, req)); // return the same value

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true, 
      message: "User has been successfully registered!"
    });
  });
})
