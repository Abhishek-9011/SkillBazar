const bcrypt = require("bcrypt");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const { z } = require("zod");
const { adminMiddleware } = require("../middleware/admin");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
adminRouter.post("/signup", async function (req, res) {
  const user = z.object({
    username: z.string().trim().min(3),
    email: z.string().email().trim(),
    password: z.string().min(5),
  });
  const { username, email, password } = user.parse(req.body);
  const failed = false;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    await adminModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
  } catch (e) {
    res.json({
      message: "User Already exist",
    });
    failed = true;
  }
  if (!failed) {
    res.json({
      message: "You are signed up",
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  try {
    const user = z.object({
      email: z.string().email().trim(),
      password: z.string().min(5),
    });

    const { email, password } = user.parse(req.body);

    const response = await adminModel.findOne({ email: email });
    console.log(response);

    console.log(response);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    const validatePassword = await bcrypt.compare(password, response.password);

    if (!validatePassword) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: response._id.toString(),
        role: "admin"
       },
      process.env.JWT_Admin_SECRET
    );

    res.json({ token });
  } catch (e) {
    console.error(e); // Log any errors
    res.status(500).json({ message: "Internal Server Error" });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  adminId = req.userId;
  const { courseTitle, courseDescription, coursePrice, ImageUrl } = req.body;
  const course = await courseModel.create({
    courseTitle,
    courseDescription,
    courseCreater: adminId,
    coursePrice,
    ImageUrl,
  });
  res.json({
    message: "course created",
    courseId: course._id,
  });
});
// const mongoose = require("mongoose");

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  adminId = req.userId;
  const { courseTitle, courseDescription, coursePrice, ImageUrl, courseId } =
    req.body;
  const course = await courseModel.updateOne(
    {
      _id: courseId,
      courseCreater: adminId,
    },
    {
      courseTitle,
      courseDescription,
      courseCreater: adminId,
      coursePrice,
      ImageUrl,
    }
  );
  res.json({
    message: "course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const courses = await courseModel.find({
    courseCreater: adminId,
  });
  res.json({
    courses,
  });
});
module.exports = {
  adminRouter: adminRouter,
};
