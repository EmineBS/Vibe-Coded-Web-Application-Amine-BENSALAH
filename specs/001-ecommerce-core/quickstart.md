# Quickstart: Full E-commerce Platform

## Environment Setup

### 1. Database (PostgreSQL)
Ensure PostgreSQL is running and create the database:
```bash
createdb ecommerce_db
```

### 2. Backend (Node.js/Express)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DB credentials
npm run migrate
npm run dev
```

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## Core Scenarios

### Guest Flow
1. Open `http://localhost:5173`.
2. Browse products and search via the search bar.
3. Add items to cart.

### User Flow
1. Register/Login.
2. Guest cart automatically merges into your account.
3. Click "Checkout" -> Simulate payment success.
4. View order in "My Orders".

### Admin Flow
1. Login with admin credentials.
2. Navigate to `/admin`.
3. Create a new product; it appears on the storefront immediately.
