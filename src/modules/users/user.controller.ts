import { Request, Response } from "express";
import { userServices } from "./user.service";

//Post User
// const createUser = async (req: Request, res: Response) => {
//   try {
//     const result = await userServices.createUser(req.body);

//     res.status(201).json({
//       success: true,
//       message: "user data posted successfully",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     res.status(404).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

//Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
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

//Update User
const updateUser = async (req: Request, res: Response) => {
  const paramsEmail = req.params.email;
  try {
    const result = await userServices.updateUser(
      paramsEmail as string,
      req.body
    );
    //console.log(result);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "User Updated Successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

//delete user
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const result = await userServices.deleteUser(userId as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "User Deleted Successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
export const userControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
