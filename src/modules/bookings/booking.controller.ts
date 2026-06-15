import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";

//creating bookings
const createBooking = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await bookingService.createBooking(req.body, user.email);
    
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: err.message,
      data: null,
    });
  }
};

//getting all bookings
const getBookings = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const result = await bookingService.getBookings(user);
    
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: err.message,
      data: null,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;

  try {
    const result = await bookingService.updateBookings(
      req.body,
      bookingId as string
    );

    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Booking not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: err.message,
      data: null,
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;
  try {
    const result = await bookingService.deleteBookings(bookingId as string);
    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Booking not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking deleted successfully",
        data: null,
      });
    }
  } catch (err: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: err.message,
      data: null,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings,
  updateBookings,
  deleteBooking,
};
