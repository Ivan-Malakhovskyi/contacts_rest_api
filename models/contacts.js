import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactPath = path.resolve("models", "contacts.json");

const updateContact = async (contact) => {
  fs.writeFile(contactPath, JSON.stringify(contact, null, 2));
};

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

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContact(contacts);

  return newContact;
};

// export const updateContact = async (contactId, body) => {};
