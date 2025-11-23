import { db } from "../connect.js";
import bcrypt from "bcrypt";
import moment from "moment";
import { logger } from "../utils/logger.js";

export const getAdmins = (req, res) => {
    const getAdminsQuery = "SELECT * FROM admins";
    let userId, usernameOfLoggedUser, role;

    if (process.env.NODE_ENV !== "test") {
        userId = req.user.id;
        usernameOfLoggedUser = req.user.username;
        role = req.user.role;
    }
  
    db.query(getAdminsQuery, (err, data) => {
        if (err) {
            if (process.env.NODE_ENV !== "test") {
                logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = DB Error on getAdmins`);
                logger.error(`Error details: ${ err.sqlMessage }`);
            };

            return res.status(500).json({ status: false, message: err.sqlMessage });
        }

        if (process.env.NODE_ENV !== "test") {
            logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Successfully get admins data`);
        };

        return res.status(200).json({ status: true, message: "Retrieving data successfull!", data: data });
    });
} 

export const addAdmin = (req, res) => {
    console.log(req.body);
    const { username , password , name , email , phone_number } = req.body;
    const requiredFields = ['username', 'password', 'name', 'email', 'phone_number'];
    
    let userId, usernameOfLoggedUser, role;

    if (process.env.NODE_ENV !== "test") {
        userId = req.user.id;
        usernameOfLoggedUser = req.user.username;
        role = req.user.role;
    }

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ status: false, message : `${field} field is required` });
        }
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    const getAdminsQuery = "INSERT INTO admins (`username`, `password`, `name`, `email`, `phone_number`, `created_at`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        username,
        hashedPass,
        name,
        email,
        phone_number,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    ];

    db.query(getAdminsQuery, values, (err, data) => {
        if (err){
            if (process.env.NODE_ENV !== "test") {
                logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error DB on addAdmin`);
                logger.error(`Error details: ${ err.sqlMessage }`);
            };

            return res.status(500).json({ status: false, message: err.sqlMessage });
        } 

        if (process.env.NODE_ENV !== "test") {
            logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Successfully add admin`);
        };

        return res.status(200).json({ status: true, message: "Inserting data successfull!" });
    });
} 

export const editAdmin = (req, res) => {
    const { id } = req.params;
    let userId, usernameOfLoggedUser, role;

    if (process.env.NODE_ENV !== "test") {
        userId = req.user.id;
        usernameOfLoggedUser = req.user.username;
        role = req.user.role;
    }

    if (!id || id.length === 0) {
        return res.status(400).json({ status: false, message: `id field is required` });
    }

    const allowedFields = ['username', 'password', 'name', 'email', 'phone_number'];
    
    // fill up available data into variable
    const updateData = {};
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    }

    if (Object.keys(updateData).length === 0) {
        // return res.status(400).json({ status: false, message: "No valid fields provided for update" });
        return res.status(400).json({ status: false, message: "One of the required field is not provided" });
    }

    // ⚠️ If password is provided, hash it before saving
    if (updateData.password) {
        const salt = bcrypt.genSaltSync(10);
        updateData.password = bcrypt.hashSync(updateData.password, salt);
    }

    const query = "UPDATE admins SET ? WHERE id = ?";

    db.query(query, [updateData, id], (err, result) => {
        if (err) {
            if (process.env.NODE_ENV !== "test") {
                logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error DB on editAdmin`);
                logger.error(`Error details: ${ err.sqlMessage }`);
            };

            return res.status(500).json({ status: false, message: err.sqlMessage });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Admin not found" });
        }

        if (process.env.NODE_ENV !== "test") {
            logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Updated successfully`);
        };

        return res.status(200).json({ status: true, message: "Admin updated successfully" });
    });
};

export const deleteAdmin = (req, res) => {
    const { id } = req.params;
    let userId, usernameOfLoggedUser, role;

    if (process.env.NODE_ENV !== "test") {
        userId = req.user.id;
        usernameOfLoggedUser = req.user.username;
        role = req.user.role;
    }

    if (!id || id.length === 0) {
        return res.status(400).json({ status: false, message: `id field is required` });
    }

    const deleteAdminQuery = "DELETE FROM admins WHERE id = ?";
    db.query(deleteAdminQuery, [ id ], (err, data) => {
        if (err) {
            if (process.env.NODE_ENV !== "test") {
                logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error DB on deleteAdmin`);
                logger.error(`Error details: ${ err.sqlMessage }`);
            };

            return res.status(500).json({ status : false, message: err.sqlMessage });
        }

        if (process.env.NODE_ENV !== "test") {
            logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = successfully deleted admin`);
        };

        return  res.status(200).json({ status: true, message: "Data has been deleted!" });
    });
} 