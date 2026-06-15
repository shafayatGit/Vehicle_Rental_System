import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";
import { body } from "express-validator";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/",
  auth("admin"),
  [
    body("vehicle_name").notEmpty().withMessage("Vehicle name is required"),
    body("type").isIn(["car", "bike", "van", "SUV"]).withMessage("Invalid vehicle type"),
    body("registration_number").notEmpty().withMessage("Registration number is required"),
    body("daily_rent_price").isInt({ min: 1 }).withMessage("Daily rent price must be at least 1"),
  ],
  validateRequest,
  vehicleController.createVehicle
);

router.get("/", vehicleController.getVehicle);

router.get("/:vehicleId", vehicleController.getSingleVehicle);

router.put("/:vehicleId", auth("admin"), vehicleController.updateVehicle);

router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle);

export const vehicleRouter = router;
