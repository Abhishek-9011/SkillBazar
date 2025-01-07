const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const adminSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const courseSchema = new Schema({
  courseTitle: String,
  courseDescription: String,
  courseCreater: ObjectId,
  coursePrice: Number,
  ImageUrl: String,
});
  
const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
