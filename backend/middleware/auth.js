import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verify error:", err.message); 
      return res.status(403).json({ status: false, message: "Unauthorized" });
    }
    
    console.log("Decoded JWT:", decoded);
    req.user = decoded; // { id, role, username }
    const userId = req.user.id;
    const usernameOfLoggedUser = req.user.username;
    const role = req.user.role;

    logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Token verified`);

    next();

    // console.log("req.cookies:", req.cookies);
    // console.log("req.headers.cookie:", req.headers.cookie);
  });
};


export const isAdmin = (req, res, next) => {
  const userId = req.user.id;
  const usernameOfLoggedUser = req.user.username;
  const role = req.user.role;

  if (req.user.role !== "admins") {
    logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Access denied: Admins only`);
    return res.status(403).json({ status: false, message: "Access denied: Admins only" });
  }
  next();
};

export const isUser = (req, res, next) => {
  const userId = req.user.id;
  const usernameOfLoggedUser = req.user.username;
  const role = req.user.role;

  if (req.user.role !== "users") {
    logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Access denied: Users only`);
    return res.status(403).json({ status: false, message: "Access denied: Users only" });
  }
  next();
};

