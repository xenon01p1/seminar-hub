import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../connect.js";
import moment from "moment";
import 'dotenv/config';

export const login = (req, res) => {
  console.log('Login function reached!');
  console.log(req.body);
  
  const { username, password, role } = req.body;
  let searchUser;

  // PARAMETER VALIDATION
  if (!username || typeof username !== 'string' || username.length === 0) return res.status(400).json({ status: false, message: "Username is empty or undefined." });
  if (!password || typeof password !== 'string' || password.length === 0) return res.status(400).json({ status: false, message: "Password is empty or undefined." });
  if (!role || (role !== 'admins' && role !== 'users')) return res.status(400).json({ status: false, message: "Role must be 'admins' or 'users'." });

  // CHECK EXISTING USER SAFELY
  if (role === 'users') searchUser = "SELECT * FROM users WHERE username = ?";
  else searchUser = "SELECT * FROM admins WHERE username = ?";

  db.query(searchUser, [username], (err, data) => {
    // ERROR AND DATA VALIDATION
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: "Database error." });
    }
    if (!data.length) return res.status(404).json({ status: false, message: "User not found." });

    const userData = data[0];

    // COMPARE PASSWORD
    const isPasswordValid = bcrypt.compareSync(String(password), userData.password); // Explicitly cast password to a string
    if (!isPasswordValid) {
      return res.status(401).json({ status: false, message: "Wrong password." });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      { id: userData.id, role: role, username: userData.username, email:userData.email },
      process.env.JWT_SECRET
    );

    res.cookie("accessToken", token, { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 2 });
    return res.json({
      status: true,
      message: "Login successful",
      token: token, 
      data: {
        id: userData.id,
        username: username, 
        email: userData.email,
        role: role,
      }
    });
  });
};

export const registerUser = (req, res) => {
  const { username, password, email } = req.body;

  if (!username || username.length === 0) return res.status(400).json({ status: false, message: "Username is empty or undefined." });
  if (!password || password.length === 0) return res.status(400).json({ status: false, message: "Password is empty or undefined." });
  if (!email || email.length === 0) return res.status(400).json({ status: false, message: "Email is empty or undefined." });

  const searchUserExist = "SELECT * FROM users WHERE username = ?";

  db.query(searchUserExist, [username], (err, data) => {
    if (err) return res.status(500).json({ status: false, message: err });
    if (data.length) return res.status(409).json({ status: false, message: "User already exists." });

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const insertUser = "INSERT INTO users (`username`, `password`, `email`, `created_at`) VALUES (?)";
    const values = 
    [
      username,
      hashedPass,
      email,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(insertUser, [values], (err) => {
      if (err) {
        return res.status(500).json({ status: false, message: err });
      }

      return res.status(200).json({ status: true, message: "User has been successfully registered!" });
    });
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true
  });
  return res.json({
    status: true,
    message: "Removing cookie success"
  })
}

