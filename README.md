# FullStack Intern Coding Challenge — Starter Repo

A full-stack web application implementing the coding challenge requirements using:

- **Backend:** Express.js + TypeScript + Sequelize + PostgreSQL
- **Frontend:** React.js + Vite + TypeScript

---

# Features

## Authentication
- User Signup
- User Login
- JWT Authentication
- Role-Based Access Control

## User Roles
- System Administrator
- Normal User
- Store Owner

## Admin Features
- Create Users
- Create Stores
- Dashboard Statistics
- View Users & Stores

## Normal User Features
- View Stores
- Search Stores
- Submit Ratings
- Modify Ratings

## Store Owner Features
- View Store Ratings
- View Users Who Rated Store
- Average Rating Dashboard

---

# Tech Stack

## Backend
- Express.js
- TypeScript
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Swagger

## Frontend
- React.js
- Vite
- TypeScript
- Axios
- React Router DOM

---

# Project Structure

```bash
root/
│
├── backend/
│
├── frontend/
│
└── postman_collection.json
```

---

# Backend Setup

## 1. Install PostgreSQL

Install PostgreSQL locally and create a database.

Example:

```sql
CREATE DATABASE fullstack_challenge;
```

---

## 2. Configure Environment Variables

Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

Update the following values:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=fullstack_challenge
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret
```

---

## 3. Install Dependencies

```bash
cd backend
npm install
```

---

## 4. Run Database Seed

```bash
npm run seed
```

---

## 5. Start Backend Server

```bash
npm run dev
```

Backend will run at:

```bash
http://localhost:4000
```

Swagger Documentation:

```bash
http://localhost:4000/api-docs
```

---

# Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```bash
http://localhost:5173
```

---

# API Documentation

Swagger documentation available at:

```bash
http://localhost:4000/api-docs
```

---

# Postman Collection

Import the provided file:

```bash
postman_collection.json
```

into Postman for API testing.

---

# Default Roles

The application supports:

- ADMIN
- USER
- STORE_OWNER

---

# Validation Rules

## Name
- Minimum 20 characters
- Maximum 60 characters

## Address
- Maximum 400 characters

## Password
- 8–16 characters
- At least one uppercase letter
- At least one special character

## Email
- Standard email validation

---

# Troubleshooting

## Missing bcrypt TypeScript Declarations

If you get:

```bash
TSError: Unable to compile TypeScript:
Could not find a declaration file for module 'bcrypt'
```

Run:

```bash
cd backend
npm install --save-dev @types/bcrypt
```

---

## SequelizeConnectionRefusedError

If you get:

```bash
SequelizeConnectionRefusedError
```

Ensure that:

- PostgreSQL server is running
- Database credentials in `.env` are correct
- Database exists locally

Verify:

```env
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
```

---

# Available Scripts

## Backend

```bash
npm run dev
npm run build
npm run seed
```

## Frontend

```bash
npm run dev
npm run build
```

---

# Future Improvements

- Pagination
- Advanced Filtering
- Responsive UI
- Docker Support
- CI/CD Pipeline
- Unit Testing

---

# Author

Deepak Singh

- GitHub: https://github.com/deepaksinghh12
- LinkedIn: https://www.linkedin.com/in/deepaksinghh12

---

# License

This project is for assessment and educational purposes.
