// const fs = require('fs/promises')
import fs from "fs/promises";
import path from "path";

const contactPath = path.resolve("models", "contacts.json");

export const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact || null;
};

export const removeContact = async (contactId) => {};

export const addContact = async (body) => {};

export const updateContact = async (contactId, body) => {};
