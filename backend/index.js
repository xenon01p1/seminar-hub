
import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import multer from 'multer';

import { login } from "./controllers/authController.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import { verifyToken } from "./middleware/auth.js";

const app = express();

// to allow cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:5173"
        ],
        credentials: true
    })
);
app.use(cookieParser());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// to get data info with all users
app.get('/me', verifyToken, (req, res) => {
  res.json({ id: req.user.id, role: req.user.role, username: req.user.username });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
