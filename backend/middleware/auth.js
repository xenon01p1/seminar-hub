import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: false, message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ status: false, message: "Unauthorized" });

    console.log("Decoded JWT:", decoded);
    req.user = decoded; // { id, role, username }
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admins") {
    return res.status(403).json({ status: false, message: "Access denied: Admins only" });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (req.user.role !== "users") {
    return res.status(403).json({ status: false, message: "Access denied: Users only" });
  }
  next();
};

