import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/", userControllers.createUser);

router.get("/", userControllers.getAllUsers)

router.get("/:email", userControllers.getSingleUser)

export const userRoutes = router;
