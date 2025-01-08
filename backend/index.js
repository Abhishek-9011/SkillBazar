const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
require("dotenv").config();
let MONGO_URL = process.env.MONGO_DB_URL;
const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


// function auth(req, res, next) {
//   const token = req.headers.token;
//   const response = jwt.verify(token, JWT_SECRET);
//   if (response) {
//     req.id = response.id;
//   } else {
//     res.status(303).json({
//       message: "Incorrecrt credential",
//     });
//   }
// }

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(3000);
}
main();
