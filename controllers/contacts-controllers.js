import { HttpError } from "../helpers/index.js";
import Contact from "../models/Contact.js";
import { ctrlContactWrapper } from "../decorators/index.js";

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...filterQueryParams } = req.query;

  const skip = (page - 1) * limit;

  const count = await Contact.countDocuments({ owner });

  const filterQuery = { owner, ...filterQueryParams };

  const result = await Contact.find(filterQuery, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  //*Будуть отримані ті фільми, якщо цей користувач їх додав
  res.json({
    result,
    total: count,
    per_page: limit,
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner }); //* return object || null
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
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );

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
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });

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
