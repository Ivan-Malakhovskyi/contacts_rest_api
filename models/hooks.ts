import type { NextFunction } from "express";

export const handleSaveErr = (err, data, next) => {
  const { code, name } = err;

  err.status = name === "MongoServerError" && code === 11000 ? 409 : 404;
  next();
};

export const handlePreUpdate = function (next: NextFunction) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
