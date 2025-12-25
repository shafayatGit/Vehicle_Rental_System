import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
import { vehicleRouter } from "./modules/vehicles/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";
import { registrationRoutes } from "./modules/auth/Registration/register.routes";
import { loginRoutes } from "./modules/auth/Login/login.routes";
const app = express();

//!Parser Or Middleware
app.use(express.json());

//! Initializing DB
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle Rental System Server");
});

//?CRUD Operation for Users
app.use("/api/v1/users", userRoutes);

//?CRUD for Vehicle
app.use("/api/v1/vehicles", vehicleRouter);

//?CRUD for Bookings
app.use("/api/v1/bookings", bookingRoutes);

//?Handling Registration
app.use("/api/v1/auth", registrationRoutes);

//?Handling Login
app.use("/api/v1/auth", loginRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
