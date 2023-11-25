import User from "../models/User.js";
import { ctrlContactWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

export default {
  signup: ctrlContactWrapper(signup),
};
