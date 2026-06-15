import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import { body } from "express-validator";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/",
  auth("admin", "customer"),
  [
    body("vehicle_id").isInt().withMessage("Valid vehicle ID is required"),
    body("rent_start_date").isISO8601().withMessage("Valid start date is required"),
    body("rent_end_date").isISO8601().withMessage("Valid end date is required"),
  ],
  validateRequest,
  bookingController.createBooking
);

router.get("/", auth("admin", "customer"), bookingController.getBookings);

router.put("/:bookingId", auth("admin"), bookingController.updateBookings);

router.delete("/:bookingId", auth("admin"), bookingController.deleteBooking);
export const bookingRoutes = router;
