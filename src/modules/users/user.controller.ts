import { Request, Response } from "express";
import { userServices } from "./user.service";
//Post User
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);

    res.status(200).json({
      success: true,
      message: "user data posted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      data: result.rows,
    });
    // console.log(result.rows);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Get single user
const getSingleUser = async (req: Request, res: Response) => {
  const paramsEmail = req.params.email;
  // console.log(paramsEmail)
  try {
    const result = await userServices.getSingleUser(paramsEmail as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
