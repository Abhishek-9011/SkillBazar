const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admin_JWT = process.env.JWT_Admin_SECRET;

function adminMiddleware(req, res, next) {
  // Extract token from Authorization header
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, Admin_JWT);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
