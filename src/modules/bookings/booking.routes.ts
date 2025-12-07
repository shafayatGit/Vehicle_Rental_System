import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/",bookingController.createBooking)

router.get("/", bookingController.getBookings)

router.put("/:bookingId",bookingController.updateBookings)

router.delete("/:bookingId",bookingController.deleteBooking)
export const bookingRoutes = router;
