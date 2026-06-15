import { Request, Response } from "express";
import { loginService } from "./login.service";
import sendResponse from "../../../utils/sendResponse";

const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginService.signinUser(email, password);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err: any) {
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: err.message,
      data: null,
    });
  }
};

export const loginController = {
  signinUser,
};
