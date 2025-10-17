import express from "express";
import { login, registerUser } from "../controllers/authController.js";
import { totalSeminarsJoined, latestSeminar } from "../controllers/dashboard.js";
import { verifyToken, isUser } from "../middleware/auth.js";
import { joinSeminar } from "../controllers/seminars.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);

// DASHBOARD
router.get("/total-seminars-joined/:user_id", verifyToken, isUser, totalSeminarsJoined);
router.get("/latest-seminar/:user_id", verifyToken, isUser, latestSeminar);

// List seminars
router.get("/join-seminar/:seminarId", verifyToken, isUser, joinSeminar);

export default router;