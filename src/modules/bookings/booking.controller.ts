import { Request, Response } from "express";
import { bookingService } from "./booking.service";

//creating bookings
const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking data posted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

//getting all bookings
const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getBookings();
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings
};
