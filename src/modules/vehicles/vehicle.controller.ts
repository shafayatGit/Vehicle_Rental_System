import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  const result = await vehicleServices.createVehicle(req.body);
  try {
    res.status(201).json({
      success: true,
      message: "vehicle data posted successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
//getting all vehicles
const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicle();
    res.status(201).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//getting single vehicle
const getSingleVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    const result = await vehicleServices.getSingleVehicle(vehicleId as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Vehicles retrieved successfully",
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

//updating vehicle
const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;

  try {
    const result = await vehicleServices.updateVehicle(
      vehicleId as string,
      req.body
    );
    // console.log(result)
    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Vehicle Data Updated Successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: err.message,
    });
  }
};

//deleting vehicle
const deleteVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;
  try {
    const result = await vehicleServices.deleteVehicle(vehicleId as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Vehicle Deleted Successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
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
