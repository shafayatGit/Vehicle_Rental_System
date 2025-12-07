import { Router } from "express";
import { authController } from "./register.controller";

const router = Router();

router.post("/signup", authController.signupUser)

export const registrationRoutes = router;
