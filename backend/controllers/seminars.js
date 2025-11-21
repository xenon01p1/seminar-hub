import moment from "moment";
import { db, dbPool } from "../connect.js"; 
import path from 'path';
import { logger } from "../utils/logger.js";

/**
 * @swagger
 * /admin/seminars:
 *   post:
 *     tags:
 *       - Seminars
 *     summary: Create a seminar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - date
 *     responses:
 *       201:
 *         description: Seminar created
 */

export const getSeminars = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM seminars");
    return res.status(200).json({ status: true, message: "Retrieving data successful!", data });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};

export const getSeminarsJoinJoinedSeminars = async (req, res) => {
  const userId = req.user.id;
  const usernameOfLoggedUser = req.user.username;
  const role = req.user.role;
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

    logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = fetched all seminars join joined data`);
    return res.status(200).json({ status: true, message: "Retrieving data successful!", data });

  } catch (error) {
    const errorMessage = error.sqlMessage;

    logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error fetching all seminars join joined data`);
    logger.error(`Error details: ${ errorMessage }`);
    return res.status(500).json({ status: false, message: errorMessage });
  }
}


export const addSeminar = async (req, res) => {
  const userId = req.user.id;
  const usernameOfLoggedUser = req.user.username;
  const role = req.user.role;

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

    logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = added new seminar`);
    return res.status(200).json({ status: true, message: "Inserting data successful!" });

  } catch (err) {
    logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error inserting seminar data`);
    logger.error(`Error details: ${ err.sqlMessage }`);
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};

export const editSeminar = async (req, res) => {
  const userId = req.user.id;
  const usernameOfLoggedUser = req.user.username;
  const role = req.user.role;
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

    logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = editted a seminar`);
    return res.status(200).json({ status: true, message: "Seminar updated successfully." });

  } catch (err) {
    logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error editing seminar data`);
    logger.error(`Error details: ${ err.sqlMessage }`);
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};

export const deleteSeminar = async (req, res) => {
    const userId = req.user.id;
    const usernameOfLoggedUser = req.user.username;
    const role = req.user.role;
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

        logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = deleted a seminar`);
        return res.status(200).json({ status: true, message: "Seminar and related data deleted." });
    } catch (err) {
        if (connection) {
            try {
                await connection.rollback(); 
            } catch (rollbackErr) {
                logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Rollback seminar data failed`);
                logger.error(`Rollback failed: ${ rollbackErr }`);
            }
        }
        
        logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = delete seminar data failed`);
        logger.error(`Error details: ${ err.message }`);
        return res.status(500).json({ status: false, message: err.message });
    } finally {
        if (connection) {
            connection.release(); 
        }
    }
};

export const joinSeminar = async (req, res) => {
  const userId = req.user.id;
  const usernameOfLoggedUser = req.user.username;
  const role = req.user.role;

  const { seminarId } = req.params;
  if (!seminarId || seminarId.length === 0) {
    return res.status(400).json({ status: false, message: "Required 'seminarId' field" });
  }

  try {
    const insertQuery = "INSERT INTO joined_users (seminar_id, user_id, joined_at) VALUES (?, ?, ?)";
    await db.query(insertQuery, [seminarId, userId, moment().format("YYYY-MM-DD HH:mm:ss")]);

    logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = joined a seminar`);
    return res.status(200).json({ status: true, message: "Seminar joined successfully." });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ status: false, message: "User already joined this seminar." });
    }

    logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = delete seminar data failed`);
    logger.error(`Error details: ${ err.message }`);
    return res.status(500).json({ status: false, message: err.sqlMessage });
  }

};

