import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { ctrlContactWrapper } from "../decorators/index.js";

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(
      404,
      `OOps such contact with id - ${contactId} not found 😥`
    );
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContactById(contactId, req.body);

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
  const result = await contactsService.removeContact(contactId);

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
