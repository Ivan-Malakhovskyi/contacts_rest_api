// const fs = require('fs/promises')
import fs from "fs/promises";
import path from "path";

const contactPath = path.resolve("models", "contacts.json");

// const updateContacts = (contact) => {
//   fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
// };

export const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {};

export const removeContact = async (contactId) => {};

export const addContact = async (body) => {};

export const updateContact = async (contactId, body) => {};

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
