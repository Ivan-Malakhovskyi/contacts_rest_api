import * as contactsService from "../models/contacts.js";

const getAllContacts = async (req, res) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      const err = new Error(
        `OOps such contact with id - ${contactId} not found 😥`
      );

      err.status = 404;
      throw err;

      //   return res.status(404).json({
      //     message: `OOps such contact with id - ${contactId} not found 😥`,
      //   });
    }
    res.json(result);
  } catch (err) {
    const { status = 500, message = "Oops server error 😥" } = err;
    res.status(status).json({ message });
  }
};

export default {
  getAllContacts,
  getById,
};
