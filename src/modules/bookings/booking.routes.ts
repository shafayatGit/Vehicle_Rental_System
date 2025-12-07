import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin", "customer"), bookingController.createBooking);

router.get("/", auth("admin"), bookingController.getBookings);

router.get("/", auth("customer"), bookingController.getBookings);

router.put("/:bookingId", bookingController.updateBookings);

router.delete("/:bookingId", bookingController.deleteBooking);
export const bookingRoutes = router;
