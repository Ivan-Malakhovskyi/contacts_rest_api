import User from "../models/User.js";
import { ctrlContactWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import "dotenv/config";
import jimp from "jimp";

const avatarsPath = path.resolve("public", "avatars");

const { JWT_SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const avatarURL = gravatar.url(email);

  if (user) {
    throw HttpError(409, "Such email is exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "20h",
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const updateUserSubscr = async (req, res, next) => {
  const { subscription } = req.body;
  const { token } = req.user;

  const { id } = jsonwebtoken.verify(token, JWT_SECRET_KEY);

  const updateUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true, runValidators: true }
  );

  if (!updateUser) {
    throw HttpError(404, "User not found");
  }

  res.status(200).json(updateUser);
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarsPath, filename);

  (await jimp.read(oldPath)).resize(250, 250).write(oldPath);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

export default {
  signup: ctrlContactWrapper(signup),
  signin: ctrlContactWrapper(signin),
  current: ctrlContactWrapper(current),
  signout: ctrlContactWrapper(signout),
  subscription: ctrlContactWrapper(updateUserSubscr),
  updateAvatar: ctrlContactWrapper(updateAvatar),
};
