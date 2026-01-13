# Antigravity Store - E-commerce Platform

A full-stack e-commerce platform featuring a product-focused, Amazon-inspired UI, secure authentication, and administrative management tools.

## 🚀 Overview

This project is a high-performance e-commerce solution built with a modern stack. It provides a familiar shopping experience with features inspired by major retailers, including a sticky navigation header, integrated search, adaptive product grids, and a comprehensive admin dashboard.

## 🏗️ Architecture

The project follows a decoupled architecture:

- **Frontend**: A React application built with Vite, styled with modern vanilla CSS and a custom design system based on design tokens.
- **Backend**: A Node.js/Express server providing RESTful APIs.
- **Database**: PostgreSQL for persistent storage, managed via `node-postgres`.

## ✨ Features

### Frontend (React)
- **Amazon-Inspired UI**: Integrated search/category header, sticky navigation, and high-density product cards.
- **Responsive Adaptive Grid**: Fluid layout that scales from mobile devices to ultra-wide monitors.
- **Real-time Search & Filtering**: Instant product discovery by name and category.
- **Secure Authentication UI**: Premium login and registration flows with persistent sessions.
- **Order Management**: User-specific order history views.
- **Light/Dark Mode**: Full theme support with automatic preference saving.

### Backend (Node.js)
- **Secure Auth**: JWT-based session management with access/refresh tokens.
- **RBAC**: Role-Based Access Control (Admin/User) for protected resources.
- **Administrative CRUD**: Full suite of APIs for product, category, and order lifecycle management.
- **Security Baseline**: Helmet for headers, CORS for cross-origin protection, and BCrypt for password hashing.
- **Performance**: Optimized SQL queries and modular service-based architecture.

## 🛠️ Security Measures

- **JWT Sessions**: 1-hour access tokens and 7-day refresh tokens.
- **Password Hashing**: BCrypt with 10 salt rounds for secure credential storage.
- **Route Protection**: Middleware-level authorization checks.
- **SQL Injection Prevention**: Using parameterized queries via `node-postgres`.
- **IP Rate Limiting**: (Optional) Ready-to-use `express-rate-limit` middleware.

## 📂 Project Structure

```text
ecommerce-platform/
├── backend/            # Express Server
│   ├── src/
│   │   ├── api/        # Routes & Controllers
│   │   ├── db/         # Migrations & Database Config
│   │   ├── middleware/ # Auth, RBAC, Validation
│   │   ├── models/     # Data Models
│   │   └── services/   # Business Logic (Auth, Product, Checkout)
├── frontend/           # React App
│   ├── src/
│   │   ├── components/ # UI Components (Navbar, Grid, Modal)
│   │   ├── hooks/      # Custom Hooks (Auth, Cart)
│   │   ├── pages/      # View Pages (Home, Admin, Orders)
│   │   └── services/   # API Clients
└── specs/              # Feature Specifications & Planning
```

## ⚙️ Environment Setup

### 1. Backend Config
Create a `backend/.env` file:
```env
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/ecommerce
JWT_SECRET=your_super_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret_key
```

### 2. Frontend Config
Create a `frontend/.env` file:
```env
VITE_API_URL=http://localhost:3000/api
```

## 🏃 Local Development

### Prerequisites
- Node.js (v20+)
- PostgreSQL

### Steps
1. **Database Setup**:
   ```bash
   cd backend
   npm install
   # Run migrations (if applicable)
   npm start
   ```
2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🚢 Deployment (VPS)

1. **Database**: Provision a RDS or local PG instance.
2. **Reverse Proxy**: Use Nginx to proxy port 80/443 to the backend (port 3000) and serve the frontend static build.
3. **Process Manager**: Use PM2 to keep the Node.js server running.
4. **Build Frontend**: `npm run build` in the frontend directory.

## 📜 License
This project is licensed under the MIT License.
