import express from "express";
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBodyRequest } from "../../decorators/index.js";
import { userSignupSchema } from "../../models/User.js";

const authRouter = express.Router();

// authRouter.post(
//   "/signup",
//   isEmptyBody,
//   validateBodyRequest(userSignupSchema),
//   authController.signup
// );

export default authRouter;
