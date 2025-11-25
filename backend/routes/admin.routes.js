import express from "express";
import { upload } from '../middleware/upload.js';
import { getUsers, addUser, editUser } from "../controllers/users.js";
import { getAdmins, addAdmin, editAdmin, deleteAdmin } from "../controllers/admins.js";
import { getSeminarsForAdmin, addSeminar, editSeminar, deleteSeminar } from "../controllers/seminars.js";
import { totalSeminars, totalUsers, totalAttendees } from "../controllers/dashboard.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Dashboard route example
router.get("/total-seminars", verifyToken, isAdmin, totalSeminars);
router.get("/total-users", verifyToken, isAdmin, totalUsers);
router.get("/total-attendees", verifyToken, isAdmin, totalAttendees);

// CRUD users TABLE
router.get("/users", verifyToken, isAdmin, getUsers);
router.post("/users", verifyToken, isAdmin, addUser);
router.patch("/users/:id", verifyToken, editUser);
// router.delete("/users/:id", verifyToken, isAdmin, deleteUser);

// CRUD admins TABLE
router.get("/admins", verifyToken, isAdmin, getAdmins);
router.post("/admins", verifyToken, isAdmin, addAdmin);
router.patch("/admins/:id", verifyToken, isAdmin, editAdmin);
router.delete("/admins/:id", verifyToken, isAdmin, deleteAdmin);

// CRUD seminars TABLE
router.get("/seminars", getSeminarsForAdmin);
router.post("/seminars", verifyToken, isAdmin, upload.single('img'), addSeminar);
router.patch("/seminars/:id", verifyToken, isAdmin, upload.single('img'), editSeminar);
router.delete("/seminars/:id", verifyToken, isAdmin, deleteSeminar);

export default router;
