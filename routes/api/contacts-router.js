import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import {
  isEmptyBody,
  isValidId,
  authentication,
} from "../../middlewares/index.js";
import { validateBodyRequest } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.use(authentication); //*Для всіх маршрутів

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:contactId", isValidId, contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBodyRequest(contactAddSchema),
  contactsControllers.add
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBodyRequest(contactUpdateSchema),
  contactsControllers.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyRequest(contactFavoriteSchema),
  contactsControllers.updateById
);

contactsRouter.delete("/:contactId", isValidId, contactsControllers.deleteById);

export default contactsRouter;
