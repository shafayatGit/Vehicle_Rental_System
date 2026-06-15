import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";
import sendResponse from "../../utils/sendResponse";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
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
//getting all vehicles
const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicle();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Vehicles retrieved successfully",
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

//getting single vehicle
const getSingleVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    const result = await vehicleServices.getSingleVehicle(vehicleId as string);
    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Vehicle not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Vehicle retrieved successfully",
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

//updating vehicle
const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;

  try {
    const result = await vehicleServices.updateVehicle(
      vehicleId as string,
      req.body
    );
    if (result.rows.length === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Vehicle not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Vehicle updated successfully",
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

//deleting vehicle
const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    const result = await vehicleServices.deleteVehicle(vehicleId as string);

    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Vehicle not found",
        data: null,
      });
    } else {
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Vehicle deleted successfully",
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
export const vehicleController = {
  createVehicle,
  getVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
