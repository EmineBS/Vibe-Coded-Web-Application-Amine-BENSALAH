<!--
Sync Impact Report
- Version change: N/A → 1.0.0
- List of modified principles:
    - Modular React Architecture (New)
    - Clean Express/Node.js API (New)
    - Security-First Development (New)
    - Database Integrity & PostgreSQL (New)
    - Secrets & Environment Management (New)
- Added sections: Deployment Rules, Development Workflow
- Removed sections: N/A
- Templates requiring updates:
    - [plan-template.md](file:///c:/Users/amine/Documents/ecommerce-platform/.specify/templates/plan-template.md) (✅ updated)
    - [spec-template.md](file:///c:/Users/amine/Documents/ecommerce-platform/.specify/templates/spec-template.md) (✅ updated)
    - [tasks-template.md](file:///c:/Users/amine/Documents/ecommerce-platform/.specify/templates/tasks-template.md) (✅ updated)
- Follow-up TODOs: N/A
-->

# Dynamic E-commerce Platform Constitution

## Core Principles

### I. Modular React Architecture
The frontend MUST be built using React with a modular component-based architecture. Components SHOULD be functional, reusable, and logically grouped by feature. Hooks MUST be used for state management and side effects, ensuring separation of concerns between UI and business logic.

### II. Clean Express/Node.js API
The backend MUST utilize Node.js with the Express framework. The API SHOULD follow RESTful principles with clearly defined routes, controllers, and services. Business logic MUST reside in the service layer, keeping controllers focused on request/response handling.

### III. Security-First Development
Production-grade security is NON-NEGOTIABLE. This includes:
- JWT-based authentication for all protected routes.
- Strict input validation and sanitization using libraries like Joi or Zod.
- Protection against common vulnerabilities (SQL injection, XSS, CSRF) using middleware like Helmet and CORS.
- Regular security audits and dependency updates.

### IV. Database Integrity & PostgreSQL
PostgreSQL MUST be the primary data store. Database schemas MUST be strictly defined with proper constraints (Foreign Keys, NOT NULL, unique checks). Migrations MUST be used for all schema changes to ensure consistency across environments. Direct DB access SHOULD be abstracted via an ORM or a dedicated data access layer.

### V. Secrets & Environment Management
Sensitive data (API keys, DB credentials, JWT secrets) MUST NEVER be committed to version control. Environment variables (`.env` files) MUST be used for configuration. A documented process for managing secrets across development, staging, and production environments MUST be followed.

## Deployment Rules

### VPS Hosting
The application MUST be deployable to a Linux-based VPS. This includes:
- Use of Docker or PM2 for process management.
- Nginx or similar as a reverse proxy with SSL/TLS termination.
- Automated backup scripts for the PostgreSQL database.
- CI/CD pipelines (e.g., GitHub Actions) for automated testing and deployment.

## Development Workflow

### Pull Requests & Code Review
All changes MUST be submitted via Pull Requests. Every PR requires at least one approval and MUST pass all automated tests (Linting, Unit, Integration) before merging. Documentation MUST be updated concurrently with code changes.

## Governance
This constitution supersedes all other regional or project-specific practices. Amendments require a formal review and update to this document, followed by a minor version bump. Compliance is monitored through automated linting rules and mandatory code reviews.

**Version**: 1.0.0 | **Ratified**: 2026-01-13 | **Last Amended**: 2026-01-13
