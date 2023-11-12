import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (req, res, next) => {
  const allKeys = Object.keys(req.body);
  if (!allKeys.length) {
    return next(HttpError(400, "Body can't be is empty"));
  }
  next();
};

export default isEmptyBody;
