import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  phone: String,
  aadhaar: Number,
  name: String,
  email: String,
  password: String,
})

userSchema.pre('save', async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err)
  }
})

const User = mongoose.model("User", userSchema)

export default User
