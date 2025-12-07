import { Request, Response } from "express";
import { authService } from "./register.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.signupUser(req.body);
    res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
export const authController = {
  signupUser,
};
