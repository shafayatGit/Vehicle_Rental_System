import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.routes";
const app = express();

//!Parser Or Middleware
app.use(express.json());

//! Initializing DB
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello This is Vehicle Rental System");
});

//?CRUD Operation for Users
app.use("/users/v1", userRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
