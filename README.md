# 🚀 Node-Express-neondb-postgresql-raw-crud-operation

A robust, high-performance RESTful API built with **Node.js**, **Express v5**, **TypeScript**, and **Neon Serverless PostgreSQL** performing **Raw SQL CRUD** operations using the `pg` (node-postgres) connection pool.

[![Node.js](https://img.shields.io/badge/Node.js-20.x%20%7C%2022.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon%20DB-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#-api-documentation)
  - [Base URL](#base-url)
  - [Endpoints Summary](#endpoints-summary)
  - [Detailed Request & Response Examples](#detailed-request--response-examples)
- [Security & Production Best Practices](#-security--production-best-practices)
- [Author](#-author)
- [License](#-license)

---

## 📖 Overview

This project demonstrates how to build a scalable and lightweight backend application without heavy ORMs (like Prisma or TypeORM). It connects directly to a **Neon Serverless PostgreSQL** instance using raw SQL statements, safe parameterized queries to prevent SQL injections, and optimal connection pooling with `pg.Pool`.

---

## ✨ Key Features

- **Raw SQL Queries**: Pure SQL execution for high control and maximum performance.
- **Neon Serverless PostgreSQL Integration**: Cloud-native, scalable PostgreSQL database connected via connection string.
- **Connection Pooling**: Managed database connections through `pg.Pool`.
- **Automatic Table Initialization**: Automatically executes `CREATE TABLE IF NOT EXISTS` on server startup.
- **Safe Parameterized Queries**: Protects against SQL Injection using `$1, $2, ...` query placeholders.
- **TypeScript Support with `tsx`**: Instant execution and live reloading without separate build steps during development.
- **Partial Updates**: Uses PostgreSQL `COALESCE` function to allow updating only provided fields in `PUT` requests.
- **RESTful Endpoints**: Clean status codes and JSON responses.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment |
| **Express.js (v5)** | Fast, unopinionated minimalist web framework |
| **TypeScript** | Static typing and modern language features |
| **Neon PostgreSQL** | Serverless cloud PostgreSQL database |
| **pg (node-postgres)** | PostgreSQL client and connection pooling |
| **dotenv** | Environment variable management |
| **tsx** | Fast TypeScript execution with watcher |

---

## 🗄 Database Schema

The database contains a `users` table that is automatically initialized on server boot:

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    is_Active BOOLEAN DEFAULT true,
    create_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Table Columns:
- `id` (INTEGER, Primary Key, Auto-increment)
- `name` (VARCHAR, Optional)
- `email` (VARCHAR, Unique, Required)
- `password` (VARCHAR, Required)
- `age` (INTEGER, Optional)
- `is_Active` (BOOLEAN, Default `true`)
- `create_at` (TIMESTAMP, Default `NOW()`)
- `updated_at` (TIMESTAMP, Default `NOW()`)

---

## 📂 Project Architecture

```plaintext
express-server/
├── src/
│   ├── config/
│   │   └── index.ts          # Centralized environment configuration
│   └── server.ts             # Express app setup, DB connection & route handlers
├── .env                      # Environment variables (Do not commit to version control)
├── package.json              # Project dependencies & scripts
├── tsconfig.json             # TypeScript compiler configuration
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.x, v20.x, or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A free [Neon Database](https://neon.tech/) account (or local PostgreSQL)

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eyasinarafat3485-gif/Node-Express-neondb-postgresql-raw-crud-operation.git
   cd Node-Express-neondb-postgresql-raw-crud-operation
   ```

2. **Navigate to the server directory:**
   ```bash
   cd express-server
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

---

### Environment Variables

Create a `.env` file in the root of `express-server/`:

```env
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@<neon-hostname>/<dbname>?sslmode=require
```

> ⚠️ **Important Security Note:** Never commit your production or real database credentials into a public GitHub repository. Add `.env` to your `.gitignore`.

---

### Running the Application

Start the server in development mode with hot-reloading:

```bash
npm run dev
```

Once running, you should see the following logs in your console:
```
Database connected!
The Express server is running on the port 5000
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Health check & welcome route |
| **POST** | `/api/v1/users` | Create a new user |
| **GET** | `/api/v1/users` | Retrieve all users |
| **GET** | `/api/v1/users/:id` | Retrieve a single user by ID |
| **PUT** | `/api/v1/users/:id` | Update user details by ID |
| **DELETE** | `/api/v1/users/:id` | Delete a user by ID |

---

### Detailed Request & Response Examples

#### 1. Root / Health Check
- **Method:** `GET`
- **URL:** `/`
- **Response:** `200 OK`
```json
{
  "success": true,
  "message": "Welcome to Express server",
  "author": "EA"
}
```

---

#### 2. Create User
- **Method:** `POST`
- **URL:** `/api/v1/users`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Eyasin Arafat",
  "email": "arafat@example.com",
  "password": "securepassword123",
  "age": 24
}
```
- **Response:** `200 OK`
```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "id": 1,
    "name": "Eyasin Arafat",
    "email": "arafat@example.com",
    "password": "securepassword123",
    "age": 24,
    "is_active": true,
    "create_at": "2026-11-17T12:00:00.000Z",
    "updated_at": "2026-11-17T12:00:00.000Z"
  }
}
```

---

#### 3. Get All Users
- **Method:** `GET`
- **URL:** `/api/v1/users`
- **Response:** `200 OK`
```json
{
  "success": true,
  "message": "Users retrived successfully done!",
  "data": [
    {
      "id": 1,
      "name": "Eyasin Arafat",
      "email": "arafat@example.com",
      "password": "securepassword123",
      "age": 24,
      "is_active": true,
      "create_at": "2026-11-17T12:00:00.000Z",
      "updated_at": "2026-11-17T12:00:00.000Z"
    }
  ]
}
```

---

#### 4. Get User by ID
- **Method:** `GET`
- **URL:** `/api/v1/users/1`
- **Response (Found):** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Eyasin Arafat",
    "email": "arafat@example.com",
    "password": "securepassword123",
    "age": 24,
    "is_active": true,
    "create_at": "2026-11-17T12:00:00.000Z",
    "updated_at": "2026-11-17T12:00:00.000Z"
  }
}
```
- **Response (Not Found):** `404 Not Found`
```json
{
  "success": false,
  "message": "User not found!"
}
```

---

#### 5. Update User by ID
- **Method:** `PUT`
- **URL:** `/api/v1/users/1`
- **Headers:** `Content-Type: application/json`
- **Request Body (Partial or Full):**
```json
{
  "name": "Eyasin Arafat (Updated)",
  "age": 25,
  "is_Active": true
}
```
- **Response:** `200 OK`
```json
{
  "success": true,
  "message": "Users updated successfully!",
  "data": {
    "id": 1,
    "name": "Eyasin Arafat (Updated)",
    "email": "arafat@example.com",
    "password": "securepassword123",
    "age": 25,
    "is_active": true,
    "create_at": "2026-11-17T12:00:00.000Z",
    "updated_at": "2026-11-17T12:30:00.000Z"
  }
}
```

---

#### 6. Delete User by ID
- **Method:** `DELETE`
- **URL:** `/api/v1/users/1`
- **Response:** `200 OK`
```json
{
  "success": true,
  "message": "User deleted successfully!"
}
```

---

## 🔒 Security & Recommended Improvements

For scaling and production readiness, consider the following enhancements:
1. **Password Hashing**: Store passwords using `bcrypt` or `argon2` instead of plain text.
2. **Environment Protection**: Ensure `.env` is listed inside `.gitignore` and credentials in Neon console are rotated if exposed.
3. **SSL Mode**: For cloud Neon DB connections, set `sslmode=require` or `{ ssl: { rejectUnauthorized: false } }`.
4. **Validation**: Use schema validation libraries such as `Zod` or `Joi` to validate request payloads before hitting database queries.
5. **Modular Architecture**: Separate routes, controllers, and database query layers into clean modular directories.

---

## 👤 Author

- **Eyasin Arafat**
- GitHub: [@eyasinarafat3485-gif](https://github.com/eyasinarafat3485-gif)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

