import { beforeAll, describe, expect, jest, test } from '@jest/globals';

jest.resetModules();

jest.unstable_mockModule('../../connect.js', () => ({
    db: {
        query: jest.fn(),
        beginTransaction: jest.fn(),
        commit: jest.fn(),
        rollback: jest.fn()
    },
    dbPool: {
        getConnection: jest.fn()
    }
}));

const { db, dbPool } = await import('../../connect.js');
const {
    getSeminars,
    getSeminarsJoinJoinedSeminars,
    addSeminar,
    editSeminar,
    deleteSeminar,
    joinSeminar
} = await import ('../../controllers/seminars.js');


console.log('INSIDE TEST → db.query =', db.query.toString());

function createRes() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); 
});

afterAll(() => {
  console.error.mockRestore();
});

describe('seminars.getSeminars', () => {
    test('Fetch data error', async() => {
        const req = {};
        const res = createRes();
        const mockError = new Error('Fake error');

        db.query.mockRejectedValueOnce(mockError);

        await getSeminars(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully fetch data', async() => {
        const req = {};
        const res = createRes();
        
        db.query.mockResolvedValueOnce({});
        
        await getSeminars(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successful!",
            data: {}
        });
    });
});

describe('seminars.getSeminarsJoinJoinedSeminars', () => {
    test("Missing user_id error", async() => {
        const req = {params: {}};
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await getSeminarsJoinJoinedSeminars(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "Required 'user_id' field",
        });
    });

    test('Fetch data error', async() => {
        const req = { params: { user_id: 1 } };
        const res = createRes();
        const mockError = new Error('Fake error');

        console.log(db.query.toString());

        db.query.mockRejectedValueOnce(mockError);

        await getSeminarsJoinJoinedSeminars(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage
        });
    });

    test('Successfully fetch data', async() => {
        const req = { params: { user_id: 1 } };
        const res = createRes();
        
        db.query.mockResolvedValueOnce({});
        
        await getSeminarsJoinJoinedSeminars(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Retrieving data successful!",
            data: {}
        });
    });
});

describe('seminars.addSeminar', () => {
    test('Missing file upload error', async() => {
        const req = {
            file: null,
            body: {
                title: "CS50 Introduction",
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await addSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "img field (file upload) is required",
        });
    });

    test('Missing required field error', async() => {
        const req = {
            file: { path: "/tmp/test.jpg" },
            body: {
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await addSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "title field is required",
        });
    });

    test('Insert data error', async() => {
        const req = {
            file: { path: "/tmp/test.jpg" },
            body: {
                title: "CS50 Introduction",
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();
        const mockError = new Error('Fake error');

        db.query.mockRejectedValueOnce(mockError);
        
        await addSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage,
        });
    });

    test('Successfully insert data', async() => {
        const req = {
            file: { path: "/tmp/test.jpg" },
            body: {
                title: "CS50 Introduction",
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce(req);
        
        await addSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Inserting data successful!",
        });
    });
});

describe('seminars.editSeminar', () => {
    test('Missing id field error', async() => {
        const req = {
            params: { id: null }, 
            file: null,
            body: {
                title: "CS50 Introduction",
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await editSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "Required 'id' field",
        });
    });

    test('No fields error', async() => {
        const req = {
            params: { id: 1 }, 
            file: null,
            body: {}
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await editSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "No valid fields provided for update",
        });
    });

    test('Edit data error', async() => {
        const req = {
            params: { id: 1 }, 
            file: { path: "/tmp/test.jpg" },
            body: {
                title: "CS50 Introduction",
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();
        const mockError = new Error('Fake error')

        db.query.mockRejectedValueOnce(mockError);
        
        await editSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage,
        });
    });

    test('Data not found error', async () => {
        const req = {
            params: { id: 1 },
            file: { path: "/tmp/test.jpg" },
            body: {
                title: "CS50 Introduction",
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({ affectedRows: 0 });

        await editSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "Seminar data not found",
        });
    });


    test('Successfully update data', async() => {
        const req = {
            params: { id: 1 },
            file: { path: "/tmp/test.jpg" },
            body: {
                title: "CS50 Introduction",
                description: "Introduction to computer science",
                category: "Technology",
                link: "https://gemini.google.com/",
                pass_code: "1234",
                start_at: "2025-10-23 01:10:00"
            }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});

        await editSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Seminar updated successfully.",
        });
    });
});

describe('seminars.deleteSeminar', () => {
    test('Missing id error', async() => {
        const req = {
            params: { id: null }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await deleteSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "Required 'id' field",
        });
    });

    test("Db delete error", async () => {
        const req = { params: { id: 1 } };
        const res = createRes();

        const mockError = new Error("awai is not defined");

        // Fake connection object
        const fakeConn = {
            beginTransaction: jest.fn().mockResolvedValue(),
            query: jest.fn().mockRejectedValue(mockError), 
            commit: jest.fn().mockResolvedValue(),
            rollback: jest.fn().mockResolvedValue(),
            release: jest.fn()
        };

        // Mock the pool
        dbPool.getConnection = jest.fn().mockResolvedValue(fakeConn);

        await deleteSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.message,
        });

        expect(fakeConn.rollback).toHaveBeenCalled();
    });

    test('Successfully delete data', async() => {
        const req = { params: { id: 1 } };
        const res = createRes();

        // Fake connection object
        const fakeConn = {
            beginTransaction: jest.fn().mockResolvedValue(),
            query: jest.fn().mockResolvedValue({}), 
            commit: jest.fn().mockResolvedValue(),
            rollback: jest.fn().mockResolvedValue(),
            release: jest.fn()
        };

        // Mock the pool
        dbPool.getConnection = jest.fn().mockResolvedValue(fakeConn);

        await deleteSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Seminar and related data deleted.",
        });

    });
});

describe('seminars.joinSeminar', () => {
    test('Missing seminar id error', async() => {
        const req = {
            params: { seminarId: null }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await joinSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "Required 'seminarId' field",
        });
    });

    test("Duplicate entry error", async () => {
        const req = {
            params: { seminarId: 1 },
            user: { id: 1 }
        };
        const res = createRes();

        const duplicateError = new Error("Duplicate");
        duplicateError.code = "ER_DUP_ENTRY";

        db.query.mockRejectedValueOnce(duplicateError);

        await joinSeminar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: "User already joined this seminar.",
        });
    });


    test('Join seminar db error', async() => {
        const req = {
            params: { seminarId: 1 },
            user: { id: 1 }
        };
        const res = createRes();
        const mockError = new Error('Fake error');

        db.query.mockRejectedValueOnce(mockError);
        
        await joinSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: false,
            message: mockError.sqlMessage,
        });
    });

    test('Successfully join seminar', async() => {
        const req = {
            params: { seminarId: 1 },
            user: { id: 1 }
        };
        const res = createRes();

        db.query.mockResolvedValueOnce({});
        
        await joinSeminar(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: true,
            message: "Seminar joined successfully.",
        });
    });
});

