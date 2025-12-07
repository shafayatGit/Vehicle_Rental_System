import { Router } from "express";
import { loginController } from "./login.controller";

const router = Router();

router.post("/signin", loginController.signinUser)

export const loginRoutes = router;
