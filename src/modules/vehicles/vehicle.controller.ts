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
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
};
