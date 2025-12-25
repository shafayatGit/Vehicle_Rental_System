# 🚗 Vehicle Rental System – Backend API

🔗 **Live API URL:** https://vehicle-rental-system-db.vercel.app/ 
📄 **API Documentation:** https://github.com/Apollo-Level2-Web-Dev/B6A2/blob/main/API_REFERENCE.md  

---

## 📌 Project Overview

The **Vehicle Rental System** is a backend RESTful API designed to manage vehicle rentals with secure authentication, role-based authorization, and real-world business logic.

It allows:
- Admins to manage vehicles, users, and bookings
- Customers to browse vehicles and create bookings
- Automatic rental price calculation and vehicle availability handling

---

## ✨ Features

- JWT-based authentication and authorization
- Role-based access control (Admin & Customer)
- Vehicle inventory management
- Booking lifecycle management (rent, cancel, return)
- Automatic price calculation
- Auto-update vehicle availability
- Business-rule enforcement (no double booking, deletion constraints)
- Standardized API response format

---

## 🛠️ Technology Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- bcrypt
- jsonwebtoken (JWT)
- dotenv

---

## 📦 Dependencies

### Production Dependencies
- express
- pg
- bcrypt
- jsonwebtoken
- dotenv
- cors
- express-validator

### Development Dependencies
- typescript
- ts-node-dev
- @types/node
- @types/express
- @types/bcrypt
- @types/jsonwebtoken
- @types/cors

---

## ⚙️ Installation & Setup

Follow the steps below to run the project locally.

### Step 1: Clone the Repository
```bash
git clone https://github.com/shafayatGit/vehicle-rental-system.git
cd vehicle-rental-system
Step 2: Install Dependencies
npm install

Step 3: Environment Configuration

Create a .env file in the root directory and add the following variables:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

Step 4: Database Setup

Install PostgreSQL if not already installed

Create a database named vehicle_rental

Ensure the database connection string in DATABASE_URL is correct

Start the PostgreSQL service

Step 5: Run the Application
Development Mode
npm run dev

Production Mode
npm run build
npm start


Once running, the server will be available at:

http://localhost:5000

🚀 Usage Instructions
Authentication Flow

Register a user:

POST /api/v1/auth/signup


Login to receive JWT token:

POST /api/v1/auth/signin


Access protected routes using the token:

Authorization: Bearer <jwt_token>

📄 API Documentation

Full API documentation with request and response examples:

➡️ API_REFERENCE.md

📁 Project Structure
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── vehicles/
│   ├── bookings/
├── middlewares/
├── utils/
├── config/
├── routes/
├── app.ts
└── server.ts

👤 Author

Shafayat Hossain
Backend Developer | Node.js | TypeScript | PostgreSQL

⭐ If you find this project useful, please consider giving it a star!



