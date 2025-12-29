import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    //console.log("Token: ",token)
    const decodedToken = jwt.verify(
      token as string,
      config.jwt_secret as string
    ) as JwtPayload;

    if (!roles.includes(decodedToken.role) && !token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    } else if (!roles.includes(decodedToken.role) && token) {
      return res.status(403).json({
        success: false,
        message: "Forbidden access",
      });
    }
    // console.log(roles.includes(decodedToken.role) && token);

    next();
  };
};

export default auth;
