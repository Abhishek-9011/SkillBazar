const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER_JWT = process.env.JWT_User_SECRET;
function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, USER_JWT);
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
  userMiddleware: userMiddleware,
};
