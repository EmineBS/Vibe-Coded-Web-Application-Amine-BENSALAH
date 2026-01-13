# Tasks: Full E-commerce Platform

**Input**: Design documents from `/specs/001-ecommerce-core/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/openapi.yaml

## Phase 1: Setup (Shared Infrastructure)
**Purpose**: Project initialization and basic structure

- [x] T001 Initialize backend Node.js project in `backend/`
- [x] T002 Initialize frontend React (Vite) project in `frontend/`
- [x] T003 [P] Configure ESLint and Prettier for both projects
- [x] T004 [P] Setup `.env` templates for backend and frontend
- [x] T005 [P] Install core dependencies (Express, pg, jsonwebtoken, zod, helmet, cors)

---

## Phase 2: Foundational (Blocking Prerequisites)
**Purpose**: Core infrastructure and security baseline

- [x] T006 Setup PostgreSQL database and Knex migration framework in `backend/src/db/`
- [x] T007 [P] Implement global error handling middleware in `backend/src/middleware/errorHandler.js`
- [x] T008 [P] Implement Zod validation middleware in `backend/src/middleware/validate.js`
- [x] T009 [P] Implement JWT authentication service in `backend/src/services/authService.js`
- [x] T010 [P] Implement Rate Limiting middleware (Express-Rate-Limit) in `backend/src/middleware/rateLimiter.js`
- [x] T011 [P] Implement Security Logging Service (logins, sensitive events) in `backend/src/services/loggerService.js`
- [x] T012 [P] Create base `NotificationService` interface (Console Logger) in `backend/src/services/notificationService.js`
- [x] T013 [P] Update User migration with lockout fields (login_attempts, lockout_until) in `backend/src/db/migrations/`
- [x] T014 [P] Implement Account Lockout logic (check/reset/increment) in `backend/src/services/authService.js`
- [x] T015 Run initial migrations for `User`, `Category`, and `Product` tables

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Product Browsing & Search (Priority: P1)
**Goal**: Allow Guests to discover products by name and category.

### Implementation for User Story 1
- [x] T016 [P] [US1] Create `Product` and `Category` models in `backend/src/models/`
- [x] T017 [P] [US1] Implement `ProductService.getProducts` with search/filter in `backend/src/services/productService.js`
- [x] T018 [US1] Create `GET /api/products` endpoint in `backend/src/api/routes/products.js`
- [x] T019 [P] [US1] Define API client for products in `frontend/src/services/api/products.js`
- [x] T020 [P] [US1] Create `ProductCard` and `ProductGrid` UI components in `frontend/src/components/`
- [x] T021 [US1] Implement Category Sidebar and Search Bar in `frontend/src/pages/HomePage.jsx`

**Checkpoint**: US1 complete and testable independently.

---

## Phase 4: User Story 2 - Cart & Secure Checkout (Priority: P1)
**Goal**: Allow Registered Users to purchase items via a secure checkout flow.

### Implementation for User Story 2
- [x] T022 [P] [US2] Create `Order` and `OrderItem` models in `backend/src/models/`
- [x] T023 [P] [US2] Implement `useCart` hook with session-to-account merge logic in `frontend/src/hooks/useCart.js`
- [x] T024 [US2] Implement `CheckoutService.processOrder` in `backend/src/services/checkoutService.js`
- [x] T025 [US2] Create `POST /api/orders` endpoint with stock decrement logic
- [x] T026 [P] [US2] Implement Mock Payment Provider redirect simulation in `frontend/src/components/PaymentModal.jsx`
- [x] T027 [US2] Create Checkout and Order Confirmation pages in `frontend/src/pages/`

**Checkpoint**: US2 complete; revenue-generating flow functional.

---

## Phase 5: User Story 3 - Product Catalog Management (Priority: P1 - Admin)
**Goal**: Allow Admin to manage catalog inventory.

### Implementation for User Story 3
- [x] T028 [P] [US3] Create `AdminMiddleware` for role-based access in `backend/src/middleware/rbac.js`
- [x] T029 [US3] Implement CRUD operations in `backend/src/services/productService.js`
- [x] T030 [US3] Create Admin API endpoints in `backend/src/api/routes/admin.js`
- [x] T031 [US3] Build Product Management dashboard in `frontend/src/pages/AdminDashboard.jsx`

---

## Phase 6: User Story 4 - Order History (Priority: P2)
- [x] T032 [P] [US4] Implement `OrderService.getUserOrders` in `backend/src/services/orderService.js`
- [x] T033 [US4] Create `GET /api/orders/me` endpoint
- [x] T034 [US4] Build "My Orders" page in `frontend/src/pages/OrderHistory.jsx`

---

## Phase 7: User Story 5 - Fulfillment Management (Priority: P2 - Admin)
- [x] T035 [US5] Implement `OrderService.updateOrderStatus` (Admin only)
- [x] T036 [US5] Build Order Management UI in `frontend/src/pages/AdminOrders.jsx`

---

## Phase 8: Polish & Deployment
**Purpose**: Security hardening and VPS readiness

- [ ] T037 [P] Configure Nginx reverse proxy template for VPS
- [ ] T038 [P] Create Docker Compose file or PM2 configuration
- [ ] T039 Final security audit (verify JWT scopes, rate limits, and SQL sanitization)
- [ ] T040 Prepare automated PG backup script in `backend/scripts/backup.sh`

---

## Phase 9: UI Global Enhancement
**Purpose**: Polish the visual identity and ensure cross-device excellence

- [ ] T041 [P] Standardize global styles (colors, fonts, spacing) in `frontend/src/index.css`
- [ ] T042 [P] Improve responsive layout and mobile optimization across all pages
- [ ] T043 Verify accessibility (contrast ratios, ARIA attributes) for inclusive UX
- [ ] T044 Implement light/dark theme support for premium feel

---

## Phase 10: UI Amazon-Inspired Layout
**Purpose**: Implement a familiar, product-focused layout for the storefront

- [x] T045 [P] Implement Amazon-inspired top navigation bar (search, categories, logo) in `frontend/src/components/Navbar.jsx`
- [x] T046 [P] Update `ProductCard` to include rating, pricing details, and clear CTA in `frontend/src/components/ProductCard.jsx`
- [x] T047 [P] Implement complex grid layout that scales across devices (desktop, tablet, mobile) in `frontend/src/components/ProductGrid.jsx`
- [x] T048 Implement sticky header functionality on scroll in `frontend/src/index.css`
- [x] T049 Refine spacing and clean UX without replicating specific branding in `frontend/src/index.css`

---

## Phase 11: Finalization & Handover
**Purpose**: Prepare the project for public viewing and collaboration

- [ ] T050 Create a comprehensive `README.md` with setup, architecture, and features
- [ ] T051 Initialize Git repository and commit project files
- [ ] T052 [Optional] Push project to GitHub (requires user approval/token)

---

## Dependencies & Execution Order
1. **Phase 1 & 2**: MUST complete before any User Story.
2. **Phase 3 (US1)**: Can be started as soon as Foundation is ready.
3. **Phase 4 (US2)**: Depends on US1 (Products must exist to be added to cart).
4. **Phase 5 (US3)**: Can run in parallel with US2.
5. **Phase 10**: Depends on Phase 3 foundations, builds upon Phase 9 enhancements.
6. **Phase 8**: Final step before production readiness.

## Parallel Execution Opportunities
- T003, T004, T005 (Setup)
- T007, T008, T009, T010, T011, T012, T013, T014 (Foundational Security/Middleware/Services)
- T016, T017, T019, T020 (Within US1)
- T022, T023, T026 (Within US2)
