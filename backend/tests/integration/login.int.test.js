import request from "supertest";
import app from "../../index.js";
import { describe, test, beforeEach } from "@jest/globals";
import { db } from "../../connect.js";
import bcrypt from "bcrypt";

describe("POST /user/login (REAL Integration)", () => {
  
  
  beforeEach(async () => {
    await db.query("DELETE FROM users");

    const hashedPassword = await bcrypt.hash("123123", 10);

    await db.query(`
        INSERT INTO users (username, password, email)
        VALUES ("test_user", "${hashedPassword}", "users@gmail.com");
    `);
  });

  test("should login successfully", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        username: "test_user",
        password: "123123",
        role: "users"
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });

  test("Should reject any missing parameters", async() => {
        const res = await request(app)
            .post("/user/login")
            .send({
                password: "123123",
                role: "users"
            });

        expect(res.status).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("Username is empty or undefined.");
  });

  test("should reject wrong password", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        username: "test_user",
        password: "wrongpass",
        role: "users"
      });

    expect(res.status).toBe(401);
  });

  test("should reject user not found", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({
        username: "unregistered",
        password: "123123",
        role: "users"
      });

    expect(res.status).toBe(404);
  });

});

