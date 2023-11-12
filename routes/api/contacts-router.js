import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBodyRequest } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../validationSchemas/contact-schema.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:contactId", contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBodyRequest(contactAddSchema),
  contactsControllers.add
);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBodyRequest(contactUpdateSchema),
  contactsControllers.updateById
);

contactsRouter.delete("/:contactId", contactsControllers.deleteById);

export default contactsRouter;
