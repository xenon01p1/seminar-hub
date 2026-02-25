import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../connect.js";
import moment from "moment";
import 'dotenv/config';
import { logger } from "../utils/logger.js";
import { promisify } from "util";
const verifyAsync = promisify(jwt.verify);

export const login = async (req, res) => {
  const { username, password, role } = req.body;

  // 1. PARAMETER VALIDATION
  if (!username || typeof username !== 'string') return res.status(400).json({ status: false, message: "Username is required." });
  if (!password || typeof password !== 'string') return res.status(400).json({ status: false, message: "Password is required." });
  if (!role || (role !== 'admins' && role !== 'users')) return res.status(400).json({ status: false, message: "Invalid role." });

  try {
    // 2. CHECK EXISTING USER (Async/Await)
    const table = role === 'users' ? 'users' : 'admins';
    const searchQuery = `SELECT * FROM ${table} WHERE username = ? LIMIT 1`;
    
    const data = await db.query(searchQuery, [username]);

    if (!data.length) {
      return res.status(404).json({ status: false, message: "User not found." });
    }

    const userData = data[0];

    // 3. REJECT IF DELETED
    if (userData.is_deleted) {
      return res.status(404).json({ status: false, message: "User not found." });
    }

    // 4. COMPARE PASSWORD (Async version)
    const isPasswordValid = await bcrypt.compare(String(password), userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: false, message: "Wrong password." });
    }

    // 5. CREATE TOKENS
    const payload = { id: userData.id, role, username: userData.username, email: userData.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    const refreshToken = jwt.sign({ id: userData.id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 6. UPDATE REFRESH TOKEN (Dynamic table)
    const updateQuery = `UPDATE ${table} SET refresh_token = ? WHERE id = ?`;
    await db.query(updateQuery, [refreshToken, userData.id]);

    // 7. LOGGING & RESPONSE
    if (process.env.NODE_ENV !== "test") {
      logger.info(`[${userData.id} - ${role}: ${userData.username}] = Logged in`);
    }

    const cookieOptions = {
      httpOnly: true, // Prevents XSS 
      secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in production
      // sameSite: "strict", 
    };

    res.cookie("accessToken", accessToken, { 
      ...cookieOptions, 
      maxAge: 1000 * 60 * 60 * 2 // 2 Hours
    });

    res.cookie("refreshToken", refreshToken, { 
      ...cookieOptions, 
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 Days
    });

    return res.json({
      status: true,
      message: "Login successful",
      access_token: accessToken,
      refreshToken: refreshToken,
      data: {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: role,
      }
    });

  } catch (err) {
    logger.error(`Login Error: ${err.message}`);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ status: false, message: "Missing required fields." });
  }

  try {
    // 1. Changed queryAsync to query
    const existingUsers = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    
    if (existingUsers.length) {
      return res.status(409).json({ status: false, message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // 2. Fix the INSERT syntax for the mysql package
    // mysql 2.x expects a nested array for [[]] style inserts or individual params
    const insertQuery = "INSERT INTO users (`username`, `password`, `email`, `created_at`, `is_deleted`) VALUES (?, ?, ?, ?, ?)";
    const values = [username, hashedPass, email, moment().format("YYYY-MM-DD HH:mm:ss"), 0];
    
    // Changed queryAsync to query
    const result = await db.query(insertQuery, values);
    const userId = result.insertId;

    const refresh_token = jwt.sign(
      { id: userId, username, email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );

    // 3. Changed db.execute to db.query (mysql 2.18 doesn't have .execute)
    const updateQuery = "UPDATE users SET refresh_token = ? WHERE id = ?";
    await db.query(updateQuery, [refresh_token, userId]);

    return res.status(201).json({ status: true, message: "Registered successfully!" });

  } catch (err) {
    logger.error(`Registration Error: ${err.message}`);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};


export const refreshToken = async (req, res) => {
  // 1. Get token from Cookies (since we moved to HttpOnly cookies earlier)
  // or req.body if you're still testing with Postman
  const tokenFromRequest = req.cookies?.refreshToken || req.body.refreshToken;

  if (!tokenFromRequest) {
    return res.status(401).json({ status: false, message: "No refresh token provided." });
  }

  try {
    // 2. Verify Token (using Promisified version to avoid callback hell)
    const decoded = await verifyAsync(tokenFromRequest, process.env.JWT_SECRET);
    const { id, role } = decoded; // Now we safely have the id and role!

    // 3. Database Check
    const table = role === 'users' ? 'users' : 'admins';
    const searchQuery = `SELECT * FROM ${table} WHERE id = ? AND refresh_token = ? LIMIT 1`;
    
    const data = await db.query(searchQuery, [id, tokenFromRequest]);

    if (!data.length || data[0].is_deleted) {
      return res.status(403).json({ status: false, message: "Invalid refresh token or user deleted." });
    }

    const userData = data[0];

    // 4. Generate New Tokens
    const payload = { id: userData.id, role, username: userData.username, email: userData.email };
    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    const newRefreshToken = jwt.sign({ id: userData.id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 5. Update DB with New Refresh Token (Token Rotation for Security)
    await db.query(`UPDATE ${table} SET refresh_token = ? WHERE id = ?`, [newRefreshToken, id]);

    // 6. Set New Cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    res.cookie("accessToken", newAccessToken, { ...cookieOptions, maxAge: 2 * 60 * 60 * 1000 });
    res.cookie("refreshToken", newRefreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({
      status: true,
      message: "Token refreshed successfully",
      access_token: newAccessToken,
      data: { id: userData.id, username: userData.username, role }
    });

  } catch (err) {
    logger.error(`Refresh Error: ${err.message}`);
    return res.status(403).json({ status: false, message: "Token expired or invalid." });
  }
};

export const logout = (req, res) => {
  if (process.env.NODE_ENV !== "test") {
    const userId = req.user.id;
    const usernameOfLoggedUser = req.user.username;
    const role = req.user.role;

    logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = is logged out`);
  };

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true
  });
  return res.json({
    status: true,
    message: "Removing cookie success"
  })
}

