import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, undefined>) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = payload;

  const result = await pool.query(
    `WITH inserted_booking AS (
      INSERT INTO bookings (
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status
      ) VALUES (
        $1, $2, $3, $4, $5, $6
      )
      RETURNING *
    )
    SELECT 
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'daily_rent_price', v.daily_rent_price
      ) AS vehicle
    FROM inserted_booking b
    JOIN vehicles v ON b.vehicle_id = v.id;
  `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
    ]
  );
  return result;
};

const getBookings = async () => {
  const result = await pool.query(`SELECT 
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,

      json_build_object(
        'name', u.name,
        'email', u.email
      ) AS customer,

      json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number
      ) AS vehicle

    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id`);
  return result;
};

const updateBookings = async (status: string, bookingsId: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingsId]
  );
  return result;
};

const deleteBookings = async(bookingsId : string)=>{
    const result = await pool.query(`DELETE FROM bookings WHERE id=$1`,[bookingsId]);
    return result;
}

export const bookingService = {
  createBooking,
  getBookings,
  updateBookings,
  deleteBookings
};
