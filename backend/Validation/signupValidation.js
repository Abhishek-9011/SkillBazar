const { z } = require("zod");


const signupSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(5, "Password must be at least 5 characters long"),
  });


module.exports = { signupSchema };
