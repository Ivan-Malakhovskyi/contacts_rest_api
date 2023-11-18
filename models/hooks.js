export const handleSaveErr = (err, data, next) => {
  err.status = 400;
  next();
};

export const handlePreUpdate = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
