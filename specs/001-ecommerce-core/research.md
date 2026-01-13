# Research: Full E-commerce Platform

## Decisions

### 1. Payment Simulation Pattern
- **Decision**: Provider Redirect Simulation.
- **Rationale**: Confirmed during clarification to use a "hosted field/redirect" simulation. This ensures the backend architecture supports asynchronous webhook processing, which is critical for future Stripe/PayPal integration.
- **Alternatives considered**: Simple boolean "Pay" button (rejected as it hides architectural complexity).

### 2. Authentication & Session Management
- **Decision**: JWT with Refresh Tokens in HttpOnly Cookies + Cart Merging Logic.
- **Rationale**: Aligns with "Security-First" constitution principle. Cart merging ensures Guests don't lose progress upon login, maximizing conversion.
- **Alternatives considered**: Session-based auth (rejected due to stateless preference for clean APIs).

### 3. Database Migration Strategy
- **Decision**: `knex` or dedicated migration CLI with raw SQL files.
- **Rationale**: PostgreSQL integrity requires strict versioned changes. knex provides a cross-platform way to manage these in Node.js while keeping the constitution's "integrity" goal.
- **Alternatives considered**: Manual SQL scripts (rejected as error-prone).

### 4. Notification Service Abstraction
- **Decision**: Emitter pattern with Console Logger implementation.
- **Rationale**: Allows core logic to remain clean and "ignorant" of specific email providers, supporting the MVP's goal of skipping real email while maintaining the architecture for it.
- **Alternatives considered**: Hardcoding console.log (rejected as it makes future integration harder).

## Best Practices

### Frontend (React)
- Use standard Vite configuration.
- Implement specialized hooks for Cart (useCart) and Auth (useAuth).
- CSS module or CSS-in-JS for isolation.

### Backend (Express)
- Use `helmet` and `cors` middleware at the entry point.
- Implement a global `errorHandler` middleware.
- Use `zod` for request body and query parameter validation.
