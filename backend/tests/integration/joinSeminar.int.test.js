import request from "supertest";
import app from "../../index.js";
import { describe, test, beforeEach, expect } from "@jest/globals";
import { db } from "../../connect.js";
import bcrypt from "bcrypt";

describe("POST /seminar/join-seminar/:seminarId (REAL Integration)", () => {

  beforeEach(async () => {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM seminars");
    await db.query("DELETE FROM joined_users");

    // create test user
    const hashedPass = await bcrypt.hash("123123", 10);

    await db.query(`
        INSERT INTO users (username, password, email)
        VALUES ("test_user", "${hashedPass}", "users@gmail.com");
    `);

    // create seminar
    await db.query(`
      INSERT INTO seminars (id, title, description, category, img, link, pass_code, start_at, created_at)
      VALUES (99, "System Design Intro", "Lorem ipsum", "Tech", "", "", "1233", NOW(), NOW());
    `);
  });

  test("Should successfully join the seminar", async () => {
    // 1) login first
    const login = await request(app)
      .post("/user/login")
      .send({
        username: "test_user",
        password: "123123",
        role: "users"
      });

    const token = login.body.token;

    // 2) join seminar with the token
    const res = await request(app)
      .get("/user/join-seminar/99")
      .set("Cookie", [`accessToken=${token}`]);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Seminar joined successfully.");
  });

  test("Should reject user who's already joined the seminar", async () => {
    // 1) login
    const login = await request(app)
        .post("/user/login")
        .send({
        username: "test_user",
        password: "123123",
        role: "users"
        });

    const token = login.body.token;

    // 2) FIRST JOIN → success
    await request(app)
        .get("/user/join-seminar/99")
        .set("Cookie", [`accessToken=${token}`]);

    // 3) SECOND JOIN → expect duplicate error
    const res = await request(app)
        .get("/user/join-seminar/99")
        .set("Cookie", [`accessToken=${token}`]);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("User already joined this seminar.");
    });


});
