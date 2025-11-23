import { describe, expect, jest, test } from "@jest/globals";

const db = { query: jest.fn() };

jest.unstable_mockModule("../../connect.js", () => ({ db }));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-jwt-token')
}));

const {
    getAdmins,
    addAdmin,
    editAdmin,
    deleteAdmin
} = await import('../../controllers/admins.js');

function createRes() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

// Silence all error
beforeAll(() => {
  jest.clearAllMocks(); // clear leftover mock state
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('admins.getAdmins', () => {
    test('Return Error', async () => {
        const req = { user: { id: 1, username: "admin", role: "admins"}};
        const res = createRes();

        const mockError = new Error('Error DB');

        db.query.mockImplementationOnce((sql, cb) => cb(mockError, null));

        await getAdmins(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully return data', async() => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();

        const mockData = [
            {
                id: 1,
                username: 'test',
                password: 'secret',
                name: 'test',
                email: 'test@gmail',
                phone_number: '0811111',
                created_at: '2025-09-30 22:08:26',
                created_by: 12,
            }
        ];

        db.query.mockImplementationOnce((sql, cb) => cb(null, mockData));

        await getAdmins(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 
            status: true, 
            message: "Retrieving data successfull!", 
            data: mockData 
        });
    });
});

describe('admins.addAdmin', () => {
    test('One of required parameter is empty error', async() => {
        const req = { 
            user: { id: 1, username: "admin", role: "admins"},
            body: {
                username: '',
                password: 'secret',
                name: 'test',
                email: 'test@gmail.com',
                phone_number: '08111111'
            }
        };
        const res = createRes();

        await addAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message : `username field is required`
        })
    });

    test('Error DB add', async() => {
        const req = { 
            user: { id: 1, username: "admin", role: "admins"},
            body: {
                username: 'test',
                password: 'secret',
                name: 'test dummy',
                email: 'test@gmail.com',
                phone_number: '08111111'
            }
        };
        const res = createRes();

        const mockError = new Error('Error DB');

        db.query.mockImplementationOnce((sql, params, cb) => cb(mockError, null));

        await addAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false, 
            message: mockError.sqlMessage
        });
    });

    test('Successfully add data', async() => {
        const req = { 
            user: { id: 1, username: "admin", role: "admins"},
            body: {
                username: 'test',
                password: 'secret',
                name: 'test dummy',
                email: 'test@gmail.com',
                phone_number: '08111111'
            }
        };
        const res = createRes();

        db.query.mockImplementationOnce((sql, params, cb) => cb(null, req));

        await addAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
           status: true, 
           message: "Inserting data successfull!"
        });
    });
});

describe('admins.editAdmin', () => {
    test('Missing ID field error', async() => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: {}, 
            body: {
                username: 'newUser',
                password: 'secret',
                name: 'Test',
                email: 'test@gmail.com',
                phone_number: '08111111'
            }
        };
        const res = createRes();

        await editAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message : `id field is required`
        })
    });

    test('Missing required field error', async() => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { id: 1}, 
            body: { }
        };
        const res = createRes();

        await editAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message : `One of the required field is not provided`
        })
    });

    test('Update DB error', async() => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { id: 1}, 
            body: { 
                username: 'newUser',
                password: 'secret',
                name: 'Test',
                email: 'test@gmail.com',
                phone_number: '08111111'
            }
        };
        const res = createRes();

        const mockError = new Error('Error update db');

        db.query.mockImplementationOnce((sql, params, cb) => cb(mockError, null));

        await editAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message : mockError.sqlMessage
        })
    });

    test('No admin found error', async () => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { id: 99 }, 
            body: { username: 'newUser' },
        };
        const res = createRes();

        db.query.mockImplementationOnce((query, values, callback) => {
            callback(null, { affectedRows: 0 });
        });

        await editAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: 'Admin not found',
        });
    });

    test('Successful update DB', async() => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { id: 1}, 
            body: { 
                username: 'newUser',
                password: 'secret',
                name: 'Test',
                email: 'test@gmail.com',
                phone_number: '08111111'
            }
        };
        const res = createRes();

        db.query.mockImplementationOnce((sql, params, cb) => cb(null, req));

        await editAdmin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message : "Admin updated successfully"
        })
    });
});