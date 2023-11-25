import { Schema, model } from "mongoose";
import { handleSaveErr, handlePreUpdate } from "./hooks.js";
import Joi from "joi";

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
      match: passwordRegex,
    },

    email: {
      type: String,
      required: [true, "Set email for user"],
      match: emailRegex,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timeseries: true }
);

userSchema.pre("findOneAndUpdate", handlePreUpdate);
userSchema.post("save", handleSaveErr);
userSchema.post("findOneAndUpdate", handleSaveErr);

export const userSignupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export const useSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

const User = model("user", userSchema);

export default User;
