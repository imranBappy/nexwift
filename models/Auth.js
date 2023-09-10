const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 30,
      trim: true,
    },
    lastName: {
      type: String,
      min: 2,
      max: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is require!"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is require!"],
      min: 5,
      max: 30,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Auth = model("Auth", authSchema);
module.exports = Auth;
