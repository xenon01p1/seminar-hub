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

const { getUsers, addUser, editUser } = await import('../../controllers/users.js');

function createRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
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

describe('users.getUsers', () => {
    test('Return error data', async() => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();
        
        const mockError = new Error('Error get db');
        
        db.query.mockImplementationOnce((sql, cb) => cb(mockError, null));
        
        await getUsers(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message : mockError.sqlMessage
        });
    });

    test('Successful fetch user data', async() => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();
        const fakeUser = [
            {
                id: 1,
                username: "test",
                password: "secret",
                email: "test@gmail.com"
            }
        ]
        
        db.query.mockImplementationOnce((sql, cb) => cb(null, fakeUser));
        
        await getUsers(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successfull!",
            data: fakeUser
        })
    });
});

describe('users.addUser', () => {
  test('Missing required field error', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      body: {
        username: "",
        password: "secret",
        email: "test@gmail.com"
      }
    };
    const res = createRes();

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'username field is required'
    });
  });

  test('Insert data to DB error', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      body: {
        username: "test",
        password: "secret",
        email: "test@gmail.com"
      }
    };
    const res = createRes();

    const mockError = new Error('Error insert to db');
    mockError.sqlMessage = 'Error insert to db';

    db.query.mockImplementationOnce((sql, params, cb) => cb(mockError, null));

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: mockError.sqlMessage
    });
  });

  test('Successfully insert user', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      body: {
        username: "test",
        password: "secret",
        email: "test@gmail.com"
      }
    };
    const res = createRes();

    db.query.mockImplementationOnce((sql, params, cb) => cb(null, {}));

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true, 
      message: "Inserting data successfull!"
    });
  });
});

describe('users.editUser', () => {
  test('Missing ID field error', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      params: {},
      body: {
        username: "test",
        password: "secret",
        email: "test@gmail.com"
      }
    };
    const res = createRes();

    await editUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'id field is required'
    });
  });

  test('No required fields error', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      params: { id: 1 },
      body: { }
    };
    const res = createRes();

    await editUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: 'No valid fields provided for update'
    });
  });

  test('DB update error', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      params: { id: 1 },
      body: {
        username: "test",
        password: "secret",
        email: "test@gmail.com"
      }
    };
    const res = createRes();

    const mockError = new Error("DB error");

    db.query.mockImplementationOnce((sql, params, cb) => cb(mockError, null));

    await editUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: mockError.sqlMessage
    });
  });

  test('User not found error', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      params: { id: 1 },
      body: {
        username: "test",
        password: "secret",
        email: "test@gmail.com"
      }
    };
    const res = createRes();

    db.query.mockImplementationOnce((sql, params, cb) => cb(null, { affectedRows: 0 }));

    await editUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: false,
      message: "User not found"
    });
  });

  test('Success update data', async() => {
    const req = { 
      user: { id: 1, username: "admin", role: "admins"},
      params: { id: 1 },
      body: {
        username: "test",
        password: "secret",
        email: "test@gmail.com"
      }
    };
    const res = createRes();

    db.query.mockImplementationOnce((sql, params, cb) => cb(null, {}));

    await editUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: true,
      message: "User updated successfully"
    });
  });
});
