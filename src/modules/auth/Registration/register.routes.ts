import { Router } from "express";
import { authController } from "./register.controller";
import { body } from "express-validator";
import validateRequest from "../../../middleware/validateRequest";

const router = Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("role").isIn(["admin", "customer"]).withMessage("Invalid role"),
  ],
  validateRequest,
  authController.signupUser
);

export const registrationRoutes = router;

