import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSchema } from "../validationSchemas/contact-schema.js";
import { contactUpdateSchema } from "../validationSchemas/contact-schema.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(
        404,
        `OOps such contact with id - ${contactId} not found 😥`
      );
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);

    if (!result) {
      throw HttpError(
        404,
        `OOps such contact with id - ${contactId} not found 😥`
      );
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);

    if (!result) {
      throw HttpError(
        404,
        `OOps such contact with id - ${contactId} not found 😥`
      );
    }

    res.status(200).json({ message: "contact was success deleted" });
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
