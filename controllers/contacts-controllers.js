import * as contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().min(4).max(10).required().messages({
    "number.empty": `"phone" cannot be an empty field`,
    "number.min": `"phone"should have a minimum length of {5}`,
    "number.max": `"phone" should have a maximum length of {10} `,
    "any.required": `"phone" is a required field`,
  }),
});

const getAllContacts = async (req, res, next) => {
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
      // const err = new Error(
      //   `OOps such contact with id - ${contactId} not found 😥`
      // );
      // err.status = 404;
      // throw err;

      //   return res.status(404).json({
      //     message: `OOps such contact with id - ${contactId} not found 😥`,
      //   });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
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

export default {
  getAllContacts,
  getById,
  addContact,
};
