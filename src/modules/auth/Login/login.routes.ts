import { Router } from "express";
import { loginController } from "./login.controller";
import { body } from "express-validator";
import validateRequest from "../../../middleware/validateRequest";

const router = Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  loginController.signinUser
);

export const loginRoutes = router;

