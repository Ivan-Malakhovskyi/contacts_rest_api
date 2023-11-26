import express from "express";
import authController from "../../controllers/auth-controller.js";
import { authentication, isEmptyBody } from "../../middlewares/index.js";
import { validateBodyRequest } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  userUpdateSubcsription,
} from "../../models/User.js";

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
  validateBodyRequest(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authentication, authController.current);

authRouter.post("/signout", authentication, authController.signout);

authRouter.patch(
  "/",
  isEmptyBody,
  authentication,
  validateBodyRequest(userUpdateSubcsription),
  authController.subscription
);

export default authRouter;
