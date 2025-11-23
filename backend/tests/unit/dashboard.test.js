import { beforeAll, describe, expect, jest } from '@jest/globals';

const db = { 
    query: jest.fn(),
    beginTransaction: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn()
};

jest.unstable_mockModule('../../connect.js', () => ({ db }));

const { 
    totalSeminars, 
    totalUsers,
    totalAttendees,
    totalSeminarsJoined,
    latestSeminar
} = await import('../../controllers/dashboard.js');

// override the promisified query
db.query = jest.fn();

function createRes() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

describe('dashboard.totalSeminars', () => {
    
    test('Catch fetch error', async () => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();
        const mockError = new Error('Error DB fetch');

        db.query.mockRejectedValueOnce(mockError);

        await totalSeminars(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully get data', async () => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();

        db.query.mockResolvedValueOnce({});

        await totalSeminars(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successful!",
            data: {}
        });
    });
});

describe('dashboard.totalUsers', () => {
    
    test('Catch fetch error', async () => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();
        const mockError = new Error('Error DB fetch');

        db.query.mockRejectedValueOnce(mockError);

        await totalUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully get data', async () => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();

        db.query.mockResolvedValueOnce({});

        await totalUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successful!",
            data: {}
        });
    });
});

describe('dashboard.totalAttendees', () => {
    
    test('Catch fetch error', async () => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();
        const mockError = new Error('Error DB fetch');

        db.query.mockRejectedValueOnce(mockError);

        await totalAttendees(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully get data', async () => {
        const req = { user: { id: 1, username: "admin", role: "admins"} };
        const res = createRes();

        db.query.mockResolvedValueOnce({});

        await totalAttendees(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successful!",
            data: {}
        });
    });
});

describe('dashboard.totalSeminarsJoined', () => {
    test('Missing user id error', async () => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { user_id: null},
        };
        const res = createRes();

        await totalSeminarsJoined(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "Required 'user_id' field."
        });
    });
    
    test('Catch fetch error', async () => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { user_id: 1},
        };
        const res = createRes();
        const mockError = new Error('Error DB fetch');

        db.query.mockRejectedValueOnce(mockError);

        await totalSeminarsJoined(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully get data', async () => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { user_id: 1},
        };
        const res = createRes();

        db.query.mockResolvedValueOnce([
            { total_seminars_joined: 10 }
        ]);

        await totalSeminarsJoined(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successful!",
            data: 10
        });
    });
});

describe('dashboard.latestSeminar', () => {

    test('Missing user id error', async () => {
        const req = { params: { id: 1 }, user: { id: 1, username: "admin", role: "admins"}};
        const res = createRes();

        await latestSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "Required 'user_id' field."
        });
    });
    
    test('Catch fetch error', async () => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { user_id: 1},
        };
        const res = createRes();
        const mockError = new Error('Error DB fetch');

        db.query.mockRejectedValueOnce(mockError);

        await latestSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully get data', async () => {
        const req = {
            user: { id: 1, username: "admin", role: "admins"},
            params: { user_id: 1},
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});

        await latestSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successful!",
            data: {}
        });
    });
});

// questions :
// 1. why does the db work like that.
// 2. why does this code expect a value while others doesn't?
// db.query.mockResolvedValueOnce([
//             { total_seminars_joined: 10 }
//         ]);

//         await totalSeminarsJoined(req, res);

//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith({
//             status: true,
//             message: "Retrieving data successful!",
//             data: 10
//         });
