import { Request, Response } from "express";
import { authService } from "./register.service";
import sendResponse from "../../../utils/sendResponse";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signupUser(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
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
export const authController = {
  signupUser,
};
