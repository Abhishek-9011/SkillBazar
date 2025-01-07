const { z } = require("zod");

const signinSchema = z.object({
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(5, "Password must be at least 5 characters long"),
  });

module.exports = { signupSchema };
