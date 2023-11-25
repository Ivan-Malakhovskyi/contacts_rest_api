import express from "express";
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBodyRequest } from "../../decorators/index.js";
import { userSignupSchema, useSigninSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  validateBodyRequest(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBodyRequest(useSigninSchema),
  authController.signin
);

export default authRouter;
