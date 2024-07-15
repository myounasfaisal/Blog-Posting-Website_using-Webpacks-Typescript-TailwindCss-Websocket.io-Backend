import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    username: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    posts: [],
    followers: [],
    following: [],
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const isTrue = await bcrypt.compareSync(password, this.password);
  return isTrue;
};
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_SECRET_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_SECRET_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
