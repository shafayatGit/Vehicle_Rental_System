import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

//Posting users
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, hashPass, phone, role]
  );
  return result;
};

//getting all users
const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

//getting user by email
const getSingleUser = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
  return result;
};
export const userServices = {
  createUser,
  getAllUsers,
  getSingleUser,
};
