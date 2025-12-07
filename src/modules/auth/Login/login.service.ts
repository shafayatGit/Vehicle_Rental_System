import { pool } from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../../config";

const signinUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const isMatchedPass = bcrypt.compare(
    password,
    user.password,
    (err: any, res: any) => {
      if (!res) {
        return false;
      }
      console.log("Pass Matched");
    }
  );
  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    config.jwt_secret as string,
    {
      expiresIn: "7d",
    }
  );

//   console.log({ token });
  return { token: `Bearer ${token}`, user };
};

export const loginService = {
  signinUser,
};
