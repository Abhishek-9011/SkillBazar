const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER_JWT = process.env.JWT_User_SECRET;  // Your user secret

function userMiddleware(req, res, next) {
  // Extract token from Authorization header
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, USER_JWT);  // Verify token with the user secret
    req.userId = decoded.id;  // Attach userId to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  userMiddleware: userMiddleware,
};
