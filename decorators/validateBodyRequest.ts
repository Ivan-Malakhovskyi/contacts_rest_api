import { HttpError } from "../helpers/index.ts";

const validateBodyRequest = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBodyRequest;
