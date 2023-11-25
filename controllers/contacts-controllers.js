import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js";
import { ctrlContactWrapper } from "../decorators/index.js";

const getAll = async (req, res, next) => {
  const result = await Contact.find({}, { createdAt: 0, updatedAt: 0 });
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId); //* return object || null
  if (!result) {
    throw HttpError(
      404,
      `OOps such contact with id - ${contactId} not found 😥`
    );
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw HttpError(
      404,
      `OOps such contact with id - ${contactId} not found 😥`
    );
  }

  res.status(200).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(
      404,
      `OOps such contact with id - ${contactId} not found 😥`
    );
  }

  res.status(200).json({ message: "contact was success deleted" });
};

export default {
  getAll: ctrlContactWrapper(getAll),
  getById: ctrlContactWrapper(getById),
  add: ctrlContactWrapper(add),
  updateById: ctrlContactWrapper(updateById),
  deleteById: ctrlContactWrapper(deleteById),
};
