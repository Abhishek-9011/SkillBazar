const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel, purchaseModel, courseModel } = require("../db");
const { z } = require("zod");
const { userMiddleware } = require("../middleware/user");
const course = require("./course");
require("dotenv").config();
const saltRound = 8;

userRouter.post("/signup", async function (req, res) {
  const userSchema = z.object({
    username: z.string().trim().min(3),
    email: z.string().email().trim(),
    password: z.string().min(5),
  });

  try {
    // Validate the request body against the schema
    const { username, email, password } = userSchema.parse(req.body);
    console.log("Validated input:", { username, email, password });

    // Check if the user already exists based on the email
    const existingUser = await userModel.findOne({ email: email });
    console.log("Existing user check:", existingUser);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, saltRound);
    console.log("Hashed password:", hashedPassword);

    // Create a new user in the database
    const newUser = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    console.log("User created:", newUser);

    // Send a success response
    res.status(201).json({
      message: "You are signed up successfully",
    });
  } catch (e) {
    // Log the error for debugging
    console.error("Error during signup:", e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  try {
    const user = z.object({
      email: z.string().email().trim(),
      password: z.string().min(5),
    });

    const { email, password } = user.parse(req.body);

    const response = await userModel.findOne({ email: email });
    console.log(response);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the hashed password
    const validatePassword = await bcrypt.compare(password, response.password);

    if (!validatePassword) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: response._id.toString(),
         role: "user"
       },
      process.env.JWT_User_SECRET
    );

    res.json({ token });
  } catch (e) {
    console.error(e); // Log any errors
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const purchases = await purchaseModel.find({
    userId,
  });
  const courseData = await courseModel.find({
    _id: {$in: purchases.map(x => x.courseId)}
  })
  
  res.json({
    courseData
  })
});

module.exports = {
  userRouter: userRouter,
};
