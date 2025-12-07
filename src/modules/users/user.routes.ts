import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

// router.post("/", userControllers.createUser);

router.get("/",auth("admin"), userControllers.getAllUsers);

router.get("/:email", userControllers.getSingleUser);

router.put("/:email",auth("admin"), userControllers.updateUser);

router.delete("/:id",auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
