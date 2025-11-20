import request from "supertest";
import app from "../../index.js";
import { describe, test, beforeEach, expect } from "@jest/globals";
import { db, dbPool } from "../../connect.js";
import bcrypt from "bcrypt";

async function login(username, password, role) {
    const login = await request(app)
        .post("/user/login")
        .send({
            username: username,
            password: password,
            role: role
        });

    return login;
} 

describe("Seminar CRUD Real Integration", () => {

    beforeEach(async() => {
        await db.query("DELETE FROM users");
        await db.query("DELETE FROM admins");
        await db.query("DELETE FROM seminars");
        await db.query("DELETE FROM joined_users");

        // add admin
        const hashedPass = await bcrypt.hash("123123", 10);

        await db.query(`
            INSERT INTO admins (username, password, email)
            VALUES ("test_admin", "${hashedPass}", "admin@gmail.com");
        `);

        // add user
        const hashedPassUser = await bcrypt.hash("123123", 10);

        await db.query(`
            INSERT INTO users (id, username, password, email)
            VALUES (99, "test_user2", "${hashedPassUser}", "testuser@gmail.com");
        `);

        // create seminar
        await db.query(`
        INSERT INTO seminars (id, title, description, category, img, link, pass_code, start_at, created_at)
        VALUES (99, "System Design Intro", "Lorem ipsum", "Tech", "", "", "1233", NOW(), NOW());
        `);
    });


    describe("POST /seminar (create)", () => {

        test("Should reject due to missing file image", async() => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;

            const res = await request(app)
                .post("/admin/seminars/")
                .set("Cookie", [`accessToken=${token}`])
                .send({
                    title: "System Design Intro",
                    description: "Lorem ipsum",
                    category: "Tech",
                    link: "",
                    pass_code: "",
                    start_at: ""
                })

            expect(res.status).toBe(400);
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("img field (file upload) is required");
        });

        test("Should reject due to missing required fields", async () => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;

            const res = await request(app)
                .post("/admin/seminars/")
                .set("Cookie", [`accessToken=${token}`])
                .attach("img", "tests/assets/test.jpg") // file upload
                .field("description", "Lorem ipsum")
                .field("category", "Tech")
                .field("link", "")
                .field("pass_code", "")
                .field("start_at", "");

            expect(res.status).toBe(400);
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("title field is required");
        });


        test("Successfully created seminar", async() => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;

            const res = await request(app)
                .post("/admin/seminars/")
                .set("Cookie", [`accessToken=${token}`])
                .attach("img", "tests/assets/test.jpg") 
                .field("title", "Ethical Hacking Introduction")
                .field("description", "Lorem ipsum")
                .field("category", "Tech")
                .field("link", "https://webinar.com/remote2026")
                .field("pass_code", "1234")
                .field("start_at", "2025-10-23 01:13:00");

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Inserting data successful!");
        });

    });


    describe("GET /seminar (get all)", () => {
        test("Should successfully return data", async() => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;
            const res = await request(app)
                .get("/admin/seminars")
                .set("Cookie", `[accessToken=${ token }]`);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Retrieving data successful!");

        });
    });


    describe("GET /get-seminars-join (get seminar for user, include ones already joined)", () => {

        test("Should successfully return data", async() => {
            const resLogin = await login("test_user2", "123123", "users");
            const token = resLogin.body.token;
            const res = await request(app)
                .get("/user/get-seminars-join/99")
                .set("Cookie", [`accessToken=${token}`]);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Retrieving data successful!");
        });
        
    });


    describe("PATCH /seminar (update)", () => {

        test("Should reject due to missing id parameter", async () => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;

            const res = await request(app)
                .patch("/admin/seminars/") // no ID
                .set("Cookie", [`accessToken=${token}`])
                .send({ title: "Updated Title" });

            expect(res.status).toBe(404); // path /admin/seminars/ dengan /admin/seminars/:id dianggap berbeda. maka dari itu expect nya 404
        });

        test("Should reject because no valid fields were provided", async () => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;

            const res = await request(app)
                .patch("/admin/seminars/99")
                .set("Cookie", [`accessToken=${token}`])
                .send({ invalidField: "fuck this"});

            expect(res.status).toBe(400);
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("No valid fields provided for update");

            
        });

        test("Should reject because seminar ID does not exist", async () => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;

            const res = await request(app)
                .patch("/admin/seminars/99999")
                .set("Cookie", [`accessToken=${token}`])
                .send({ title: "Updated Title" });

            expect(res.status).toBe(404);
            expect(res.body.status).toBe(false);
            expect(res.body.message).toBe("Seminar data not found");
        });

        test("Should successfully update seminar", async () => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;

            // Use an EXISTING ID from your seed or fixture
            const res = await request(app)
                .patch("/admin/seminars/99")
                .set("Cookie", [`accessToken=${token}`])
                .send({
                    title: "New Title",
                    description: "Updated Description"
                });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Seminar updated successfully.");
        });

    });

    describe("DELETE /seminar (delete)", () => {
        test("Should reject due to missing parameter", async() => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;
            const res = await request(app)
                .delete("/admin/seminars/")
                .set("Cookie", [`accessToken=${token}`]);

            expect(res.status).toBe(404); 
        });

        test("Should successfully delete data", async() => {
            const resLogin = await login("test_admin", "123123", "admins");
            const token = resLogin.body.token;
            const res = await request(app)
                .delete("/admin/seminars/99")
                .set("Cookie", [`accessToken=${token}`]);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.message).toBe("Seminar and related data deleted.");
        });
    });
});