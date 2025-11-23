import { db } from "../connect.js";
import util from "util";
import { logger } from "../utils/logger.js";

db.query = util.promisify(db.query).bind(db);
db.beginTransaction = util.promisify(db.beginTransaction).bind(db);
db.commit = util.promisify(db.commit).bind(db);
db.rollback = util.promisify(db.rollback).bind(db);

// DASHBOARD ADMIN

export const totalSeminars = async (req, res) => {
  let userId, usernameOfLoggedUser, role;

  if (process.env.NODE_ENV !== "test") {
    userId = req.user.id;
    usernameOfLoggedUser = req.user.username;
    role = req.user.role;
  }

  try {
    const data = await db.query(`
      SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total_seminars
      FROM seminars
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
      GROUP BY month
      ORDER BY month DESC
      LIMIT 5
    `);

    if (process.env.NODE_ENV !== "test") {
      logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = fetched total seminars data`);
    }

    return res.status(200).json({
      status: true,
      message: "Retrieving data successful!",
      data 
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error fetching total seminars data`);
      logger.error(`Error details: ${ err.sqlMessage }`);
    };

    return res.status(500).json({
      status: false,
      message: err.sqlMessage
    });
  }
};

export const totalUsers = async (req, res) => {
  let userId, usernameOfLoggedUser, role;

  if (process.env.NODE_ENV !== "test") {
    userId = req.user.id;
    usernameOfLoggedUser = req.user.username;
    role = req.user.role;
  }

  try {
    const data = await db.query(`
      SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total_users
      FROM users
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
      GROUP BY month
      ORDER BY month DESC
      LIMIT 5
    `);

    if (process.env.NODE_ENV !== "test") {
      logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = fetched total users data`);
    };

    return res.status(200).json({
      status: true,
      message: "Retrieving data successful!",
      data 
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error fetching total users data`);
      logger.error(`Error details: ${ err.sqlMessage }`);
    };

    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};


export const totalAttendees = async (req, res) => {
  let userId, usernameOfLoggedUser, role;

  if (process.env.NODE_ENV !== "test") {
    userId = req.user.id;
    usernameOfLoggedUser = req.user.username;
    role = req.user.role;
  }

  try {
    const data = await db.query(`
      SELECT DATE_FORMAT(joined_at, '%Y-%m') AS month, COUNT(*) AS total_attendees
      FROM joined_users
      WHERE joined_at >= DATE_SUB(CURDATE(), INTERVAL 5 MONTH)
      GROUP BY month
      ORDER BY month DESC
      LIMIT 5
    `);

    if (process.env.NODE_ENV !== "test") {
      logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = fetched total attendees data`);
    };

    return res.status(200).json({
      status: true,
      message: "Retrieving data successful!",
      data // return full array
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error fetching total attendees data`);
      logger.error(`Error details: ${ err.sqlMessage }`);
    };

    return res.status(500).json({ status: false, message: err.sqlMessage });
  }
};


// DASHBOARD USER
export const totalSeminarsJoined = async (req, res) => {
  let userId, usernameOfLoggedUser, role;

  if (process.env.NODE_ENV !== "test") {
    userId = req.user.id;
    usernameOfLoggedUser = req.user.username;
    role = req.user.role;
  }

    const { user_id } = req.params;
    if (!user_id || user_id.length === 0) return res.status(400).json({ status: false, message: "Required 'user_id' field." });

    try {
        const data = await db.query(
            "SELECT COUNT(*) AS total_seminars_joined FROM joined_users WHERE user_id = ?",
            [ user_id ]
        );
        const total = data[0].total_seminars_joined; 

        if (process.env.NODE_ENV !== "test") {
          logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = fetched total seminars joined data`);
        };

        return res.status(200).json({ status: true, message: "Retrieving data successful!", data: total }); 
    } catch(err) {
      if (process.env.NODE_ENV !== "test") {
        logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error fetching total seminars joined data`);
        logger.error(`Error details: ${ err.sqlMessage }`);
      };

      return res.status(500).json({ status: false, message: err.sqlMessage });
    }
}

export const latestSeminar = async (req, res) => {
  let userId, usernameOfLoggedUser, role;

  if (process.env.NODE_ENV !== "test") {
    userId = req.user.id;
    usernameOfLoggedUser = req.user.username;
    role = req.user.role;
  }
  
  const { user_id } = req.params;

  if (!user_id || user_id.length === 0) return res.status(400).json({ status: false, message: "Required 'user_id' field." });

  try {
    const data = await db.query(`
      SELECT 
        s.id, 
        s.title,
        s.category,
        s.link, 
        s.pass_code,
        s.start_at, 
        COUNT(j.user_id) AS total_attendees
      FROM seminars s
      LEFT JOIN joined_users j ON s.id = j.seminar_id
      WHERE j.user_id = ?
      GROUP BY s.id, s.title, s.start_at
      ORDER BY s.start_at DESC
      LIMIT 5
    `, [ user_id ]);

    if (process.env.NODE_ENV !== "test") {
      logger.info(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = fetched latest seminars joined data`);
    }

    return res.status(200).json({
      status: true,
      message: "Retrieving data successful!",
      data 
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "test") {
      logger.error(`[${ userId } - ${ role }: ${ usernameOfLoggedUser } ] = Error fetching latest seminars data`);
      logger.error(`Error details: ${ err.sqlMessage }`);
    };
    
    return res.status(500).json({
      status: false,
      message: err.sqlMessage
    });
  }
};

