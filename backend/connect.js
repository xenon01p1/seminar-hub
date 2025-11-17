import mysql from "mysql";
import util from "util"; // ⬅️ You need this!

// ------------------------------------------------------------------
// 1. Single Connection (For existing, non-transactional code)
// ------------------------------------------------------------------
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "seminar"
});

// Promisify the query method on the single connection
// db.query = util.promisify(db.query).bind(db);

if (process.env.NODE_ENV !== "test") {
    db.query = util.promisify(db.query).bind(db);
    db.beginTransaction = util.promisify(db.beginTransaction).bind(db);
    db.commit = util.promisify(db.commit).bind(db);
    db.rollback = util.promisify(db.rollback).bind(db);
}

// ------------------------------------------------------------------
// 2. Connection Pool (For new, stable transactional code)
// ------------------------------------------------------------------
export const dbPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "seminar",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify the getConnection method on the Pool
dbPool.getConnection = util.promisify(dbPool.getConnection).bind(dbPool);

// Promisify the pool's query method as well (optional, but good for standalone queries)
dbPool.query = util.promisify(dbPool.query).bind(dbPool);