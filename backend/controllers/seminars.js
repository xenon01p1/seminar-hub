import moment from "moment";
import { db, dbPool } from "../connect.js"; 
import util from "util";
import path from 'path';

// Promisify once
db.query = util.promisify(db.query).bind(db);
db.beginTransaction = util.promisify(db.beginTransaction).bind(db);
db.commit = util.promisify(db.commit).bind(db);
db.rollback = util.promisify(db.rollback).bind(db);

export const getSeminars = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM seminars");
    return res.status(200).json({ status: true, message: "Retrieving data successful!", data });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};

export const getSeminarsJoinJoinedSeminars = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id || user_id.length === 0) {
    return res.status(400).json({ status: false, message: "Required 'user_id' field" });
  }

  try {
    const query = `
      SELECT 
        s.*,
        CASE 
          WHEN ju.user_id IS NOT NULL THEN TRUE 
          ELSE FALSE 
        END AS is_registered
      FROM 
        seminars s
      LEFT JOIN 
        joined_users ju 
        ON s.id = ju.seminar_id AND ju.user_id = ?
    `;

    const data = await db.query(query, [user_id]);

    return res.status(200).json({ status: true, message: "Retrieving data successful!", data })
  } catch (error) {
    console.error("Database Query Error:", error);
    const errorMessage = error.sqlMessage || error.message || "An internal server error occurred.";
    return res.status(500).json({ status: false, message: errorMessage });
  }
}


export const addSeminar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: false, message: "img field (file upload) is required" });
  }

  const filePath = req.file.path; 
  const { title, description, category, link, pass_code, start_at } = req.body;
  
  const requiredFields = ['title', 'description', 'category', 'link', 'pass_code', 'start_at'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ status: false, message: `${field} field is required` });
    }
  }
  
  try {
    const addSeminarQuery = `
      INSERT INTO seminars 
      (title, description, category, img, link, pass_code, start_at, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const publicPath = '/upload/' + path.basename(filePath); 
    const values = [title, description, category, publicPath, link, pass_code, start_at, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),];

    await db.query(addSeminarQuery, values);

    return res.status(200).json({ status: true, message: "Inserting data successful!" });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};

export const editSeminar = async (req, res) => {
  const { id } = req.params;
  if (!id || id.length === 0) {
    return res.status(400).json({ status: false, message: "Required 'id' field" });
  }

  const allowedFields = ['title', 'description', 'category', 'link', 'pass_code', 'start_at'];
  const updateData = {};
  
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  if (req.file) {
    const filePath = req.file.path; 
    const publicPath = '/upload/' + path.basename(filePath);
    updateData.img = publicPath;
  

  } else if (req.body.existing_img) {
    updateData.img = req.body.existing_img;
    
  } 

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ status: false, message: "No valid fields provided for update" });
  }

  try {
    const editSeminarQuery = "UPDATE seminars SET ? WHERE id = ?";
    const result = await db.query(editSeminarQuery, [updateData, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "Seminar data not found" });
    }

    return res.status(200).json({ status: true, message: "Seminar updated successfully." });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};

export const deleteSeminar = async (req, res) => {
    const { id } = req.params;
    if (!id || id.length === 0) {
        return res.status(400).json({ status: false, message: "Required 'id' field" });
    }

    let connection; 

    try {
        // 💡 Use the dedicated transaction pool
        connection = await dbPool.getConnection(); 

        await connection.beginTransaction();
        await connection.query("DELETE FROM seminars WHERE id = ?", [id]);

        await connection.commit();

        return res.status(200).json({ status: true, message: "Seminar and related data deleted." });
    } catch (err) {
        console.error("Original Transaction Error:", err); 
        
        if (connection) {
            try {
                await connection.rollback(); 
            } catch (rollbackErr) {
                console.error("Rollback failed:", rollbackErr);
            }
        }
        
        return res.status(500).json({ status: false, message: err.message });
    } finally {
        if (connection) {
            connection.release(); 
        }
    }
};

export const joinSeminar = async (req, res) => {
  const { seminarId } = req.params;
  if (!seminarId || seminarId.length === 0) {
    return res.status(400).json({ status: false, message: "Required 'seminarId' field" });
  }

  const userId = req.user.id;

  try {
    const insertQuery = "INSERT INTO joined_users (seminar_id, user_id, joined_at) VALUES (?, ?, ?)";
    await db.query(insertQuery, [seminarId, userId, moment().format("YYYY-MM-DD HH:mm:ss")]);
    return res.status(200).json({ status: true, message: "Seminar joined successfully." });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ status: false, message: "User already joined this seminar." });
    }
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }

};

