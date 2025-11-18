import request from "supertest";
import app from "../../index.js";
import { describe, test, beforeEach, expect } from "@jest/globals";
import { db } from "../../connect.js";
import bcrypt from "bcrypt";

describe("POST user/register (REAL Integration)", () => {
    beforeEach(async() => {
        await db.query("DELETE FROM users");

        const hashedPass = await bcrypt.hash("123123", 10);

        await db.query(`
            INSERT INTO users (username, password, email)
            VALUES ("test_user", "${hashedPass}", "users@gmail.com");
        `);
    });

    test("Should reject any missing parameters", async() => {
        const res = await request(app)
            .post("/user/register")
            .send({
                username: "test_user",
                password: "123123",
            });
        
        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("Email is empty or undefined.");
    });

    test("Should reject any duplicate username", async() => {
        const res = await request(app)
            .post("/user/register")
            .send({
                username: "test_user",
                password: "123123",
                email: "users@gmail.com"
            });
        
        expect(res.status).toBe(409);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("User already exists.");
    });

    test("Should successfully registered", async() => {
        const res = await request(app)
            .post("/user/register")
            .send({
                username: "test_user2",
                password: "123123",
                email: "users@gmail.com"
            });
        
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("User has been successfully registered!");
    });

});