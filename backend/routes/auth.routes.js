import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { refreshToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/verify", verifyToken, (req, res) => {
  console.log("Cookies received:", req.cookies);
  console.log("Authorization header:", req.headers.authorization);
  return res.status(200).json({
    status: true,
    user: req.user
  });
});

router.post("/refresh_token", refreshToken);

export default router;