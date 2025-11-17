
import express from "express";
import { createRequire } from "module";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { swaggerSpec, swaggerUiMiddleware } from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger-output.json");
// import multer from 'multer';

import { login } from "./controllers/authController.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { verifyToken } from "./middleware/auth.js";

const app = express();

// use swagger
// app.use("/docs", swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// to allow cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });
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
app.use("/auth", authRoutes);

// to get data info with all users
app.get('/me', verifyToken, (req, res) => {
  res.json({ id: req.user.id, role: req.user.role, username: req.user.username });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
