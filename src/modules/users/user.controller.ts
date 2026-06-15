import { Request, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";

//Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
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

//Get single user
const getSingleUser = async (req: Request, res: Response) => {
  const paramsEmail = req.params.email;
  try {
    const result = await userServices.getSingleUser(paramsEmail as string);
    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
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

//Update User
const updateUser = async (req: Request, res: Response) => {
  const paramsEmail = req.params.email;
  try {
    const result = await userServices.updateUser(
      paramsEmail as string,
      req.body
    );
    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
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

//delete user
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const result = await userServices.deleteUser(userId as string);
    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
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
export const userControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
