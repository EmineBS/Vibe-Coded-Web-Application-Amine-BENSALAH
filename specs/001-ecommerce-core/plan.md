# Implementation Plan: Full E-commerce Platform

**Branch**: `001-ecommerce-core` | **Date**: 2026-01-13 | **Spec**: [spec.md](file:///C:/Users/amine/Documents/ecommerce-platform/specs/001-ecommerce-core/spec.md)
**Input**: Feature specification from `/specs/001-ecommerce-core/spec.md`

## Summary

Implementation of a full-stack e-commerce platform with Guest, Registered User, and Admin actors. The system will feature a modular React frontend and a clean Node.js/Express backend, persisted in a PostgreSQL database. Key flows include secure JWT-based checkout with simulated payment provider integration and a comprehensive admin dashboard for catalog management.

## Technical Context

**Language/Version**: Node.js (v20+), JavaScript (ESM)
**Primary Dependencies**: React (Vite), Express, pg (node-postgres), redis (caching), jsonwebtoken, Zod (validation), Helmet, CORS, express-rate-limit, EventEmitter (internal)
**Storage**: PostgreSQL
**Testing**: Vitest (Frontend), Supertest + Jest (Backend)
**Target Platform**: Linux VPS
**Project Type**: Web application
**Performance Goals**: <2s response for primary actions; support 100 concurrent users
**Constraints**: Security-First (JWT, Rate-limiting); Database Integrity (Foreign keys, Migrations)
**Scale/Scope**: ~5 key entities; ~15-20 API endpoints; 3 user roles

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Modular React Architecture**: Functional components with custom hooks for logic separation.
- [x] **Clean Express/Node.js API**: Service-oriented architecture with clear controller/service separation.
- [x] **Security-First Development**: JWT auth, Zod validation, Helmet, and rate-limiting.
- [x] **Database Integrity & PostgreSQL**: Migrations for schema changes; strict constraints.
- [x] **Secrets & Environment Management**: `.env` usage for all environment-specific configs.
- [x] **VPS Hosting**: Nginx reverse proxy; PM2/Docker for process management.

## Project Structure

### Documentation (this feature)

```text
specs/001-ecommerce-core/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (OpenAPI)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/             # Routes and Controllers
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── categories.js
│   │   │   ├── orders.js
│   │   │   └── admin.js
│   ├── services/        # Business Logic & Event Bus
│   ├── models/          # Data Access / Entities
│   ├── middleware/      # Auth, Logging, Validation, Event Logs
│   ├── subscribers/     # Decoupled Event Handlers (Side Effects)
│   ├── constants/       # Centralized Events & Config
│   ├── db/              # Migrations and Seeds
│   └── app.js           # Server Entry
└── tests/

frontend/
├── src/
│   ├── components/      # UI Components
│   ├── services/        # API Clients
│   ├── hooks/           # Business Logic
│   ├── pages/           # Route views
│   └── main.jsx         # App Entry
└── tests/
```

**Structure Decision**: Web application (Option 2) structure chosen to cleanly separate the React frontend from the Express backend, aligning with the "Clean API" and "Modular React" principles.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
