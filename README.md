# FullStack Intern Coding Challenge — Starter Repo

This repository is a starter full-stack project implementing the challenge:
- Backend: Express + TypeScript + Sequelize + PostgreSQL
- Frontend: React + Vite + TypeScript

It includes:
- Backend APIs: Auth (signup/login), Admin (create users/stores, dashboard counts), Stores & Ratings endpoints
- Frontend: basic React app with Signup/Login, Store list, Rating UI
- Sequelize models and a seed script
- Swagger setup at `/api-docs`
- Postman collection: `postman_collection.json`

## Quickstart (backend)

1. Install PostgreSQL and create a database (example):
   ```sql
   CREATE DATABASE fullstack_challenge;
   ```
2. Copy `.env.example` to `.env` and update DB credentials.
3. Install backend deps and run seed:
   ```bash
   cd backend
   npm install
   npm run seed
   npm run dev
   ```
4. Backend runs at http://localhost:4000, Swagger at http://localhost:4000/api-docs

## Quickstart (frontend)
1. In a new terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Frontend runs at http://localhost:5173 (or port shown by Vite)

## Notes
- Password rules, field validations and role-based access are implemented on the backend.
- This is a starter scaffold — expand UI and add production configs as needed.
