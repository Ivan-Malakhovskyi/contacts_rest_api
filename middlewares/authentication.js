import jsonwebtoken from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { ctrlContactWrapper } from "../decorators/index.js";
import User from "../models/User.js";
import "dotenv/config";

const { JWT_SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw HttpError(401, "Not authorized");
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jsonwebtoken.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;

    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default ctrlContactWrapper(authentication);
