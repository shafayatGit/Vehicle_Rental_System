import { pool } from "../../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { error } from "console";

const signinUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  if (result.rows.length === 0) {
    throw new Error("Access denied: Email didn't matched");
  }
  const user = result.rows[0];

  const isMatchedPass = await bcrypt.compare(password, user.password);
  
  if (!isMatchedPass) {
    throw new Error("Access denied: Password didn't matched");
  } else {
    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      config.jwt_secret as string,
      {
        expiresIn: "7d",
      }
    );

    //   console.log({ token });
    return { token: `Bearer ${token}`, user };
  }
};

export const loginService = {
  signinUser,
};
