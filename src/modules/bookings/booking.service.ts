import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, any>, userEmail: string) => {
  const {
    vehicle_id,
    rent_start_date,
    rent_end_date,
  } = payload;

  // Get user id from email
  const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [userEmail]);
  if (userResult.rows.length === 0) {
    throw new Error("User not found");
  }
  const customer_id = userResult.rows[0].id;

  // Check vehicle availability and get daily price
  const vehicleResult = await pool.query(
    'SELECT daily_rent_price, availability_status FROM vehicles WHERE id = $1',
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const { daily_rent_price, availability_status } = vehicleResult.rows[0];

  if (availability_status !== 'available') {
    throw new Error("Vehicle is not available for booking");
  }

  // Calculate total price
  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day
  const total_price = diffDays * daily_rent_price;

  const result = await pool.query(
    `WITH inserted_booking AS (
      INSERT INTO bookings (
        customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status
      ) VALUES (
        $1, $2, $3, $4, $5, 'active'
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
    ]
  );

  // Update vehicle status
  await pool.query(
    `UPDATE vehicles 
       SET availability_status = 'booked'
       WHERE id = $1`,
    [vehicle_id]
  );
  return result;
};

const getBookings = async (user?: { email: string; role: string }) => {
  let query = `SELECT 
      b.id,
      b.customer_id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,
      json_build_object(
        'vehicle_name', v.vehicle_name,
        'registration_number', v.registration_number
      ) AS vehicle
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id`;

  let params: any[] = [];
  if (user && user.role === 'customer') {
    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [user.email]);
    if (userResult.rows.length > 0) {
      query += ` WHERE b.customer_id = $1`;
      params.push(userResult.rows[0].id);
    }
  }

  const result = await pool.query(query, params);
  return result;
};

const updateBookings = async (
  payload: Record<string, any>,
  bookingsId: string
) => {
  const { status } = payload;
  const bookingRes = await pool.query(
    `SELECT vehicle_id FROM bookings WHERE id = $1`,
    [bookingsId]
  );
  
  if (bookingRes.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const vehicleId = bookingRes.rows[0].vehicle_id;
  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingsId]
  );

  if (status === "returned" || status === "cancelled") {
    await pool.query(
      `UPDATE vehicles 
         SET availability_status = 'available' 
         WHERE id = $1`,
      [vehicleId]
    );
  }
  return result;
};

const deleteBookings = async (bookingsId: string) => {
  const result = await pool.query(`DELETE FROM bookings WHERE id=$1`, [
    bookingsId,
  ]);
  return result;
};

export const bookingService = {
  createBooking,
  getBookings,
  updateBookings,
  deleteBookings,
};
