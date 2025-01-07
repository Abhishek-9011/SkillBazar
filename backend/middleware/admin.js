const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admin_JWT = process.env.JWT_Admin_SECRET;
function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, Admin_JWT);
  if(decoded){
    req.userId = decoded.id;
    next();
  } else{
    res.json({
        message: "You are not signed in"
    })
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
