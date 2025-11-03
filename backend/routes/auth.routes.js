import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/verify", verifyToken, (req, res) => {
  console.log("Cookies received:", req.cookies);
  console.log("Authorization header:", req.headers.authorization);
  return res.status(200).json({
    status: true,
    user: req.user
  });
});

export default router;