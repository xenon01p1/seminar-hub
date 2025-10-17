import { db } from "../connect.js";
import 'dotenv/config';
import moment from "moment";
import bcrypt from "bcrypt";

export const getUsers = (req, res) => {
    const getUserQuery = "SELECT * FROM users WHERE is_deleted = 0"; 
    
    db.query(getUserQuery, (err, data) => {
        if (err) return res.status(500).json({ status: false, message: err.sqlMessage });
        return res.status(200).json({ status: true, message: "Retrieving data successfull!", data: data });
    })
};

export const addUser = (req, res) => {
    const requiredFields = ['username', 'password', 'email'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ status: false, message : `${field} field is required` });
        }
    }

    const { username, password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const addUserQuery = "INSERT INTO users (`username`, `password`, `email`, `created_at`, `is_deleted`) VALUES (?, ?, ?, ?, ?)"; // Use backticks
    const values = [
        username,
        hashedPass,
        email,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        0
    ];

    db.query(addUserQuery, values, (err, data) => {
        if (err) return res.status(500).json({ status: false, message: err.sqlMessage });
        return res.status(200).json({ status: true, message: "Inserting data successfull!" });
    });
};

export const editUser = (req, res) => {
    // get param data
    const { id } = req.params;
    if (!id || id.length === 0) return res.status(400).json({ status: false, message: `id field is required` });

    // get body data
    const allowedFields = ['username', 'password', 'email', 'is_deleted'];
    let updateData = { };
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ status: false, message: "No valid fields provided for update" });
    }

    // ⚠️ If password is provided, hash it before saving
    if (updateData.password) {
        const salt = bcrypt.genSaltSync(10);
        updateData.password = bcrypt.hashSync(updateData.password, salt);
    }

    const editUserQuery = "UPDATE users SET ? WHERE id = ?";
    db.query(editUserQuery, [ updateData, id ], (err, data) => {
        if (err) {
            return res.status(500).json({ status: false, message: err.sqlMessage  });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        return res.status(200).json({ status: true, message: "User updated successfully" });
    });
}
