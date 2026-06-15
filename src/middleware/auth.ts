import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access: Token missing",
        });
      }

      const decodedToken = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      if (!roles.includes(decodedToken.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access: You do not have the required permissions",
        });
      }

      (req as any).user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access: Invalid token",
      });
    }
  };
};

export default auth;
