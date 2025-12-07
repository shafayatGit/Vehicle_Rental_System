import { Request, Response } from "express";
import { loginService } from "./login.service";

const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginService.signinUser(email, password);
    res.status(200).json({
      success: true,
      message: "Login Successful",
      data: result,
    });
  } catch (err: any) {
    res.status(201).json({
      succuss: false,
      message: err.message,
    });
  }
};

export const loginController = {
  signinUser,
};
