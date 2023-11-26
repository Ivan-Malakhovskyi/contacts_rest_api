import { Schema, model } from "mongoose";
import { handleSaveErr, handlePreUpdate } from "./hooks.js";
import Joi from "joi";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
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
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("findOneAndUpdate", handlePreUpdate);
userSchema.post("save", handleSaveErr);
userSchema.post("findOneAndUpdate", handleSaveErr);

export const userSignupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({ "any.required": `"email" is a required field` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `"password" is a required field` }),
  //.pattern(passwordRegex)
});

export const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required()
    .messages({ "any.required": `"email" is a required field` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `"password" is a required field` }),
  //.pattern(passwordRegex)
});

export const userUpdateSubcsription = Joi.object({
  subscription: Joi.string()
    .required()
    .messages({ "any.required": `"subscription" is a required field` }),
});

const User = model("user", userSchema);

export default User;
