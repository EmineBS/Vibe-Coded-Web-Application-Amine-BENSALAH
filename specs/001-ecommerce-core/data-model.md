# Data Model: Full E-commerce Platform

## Entities

### User
Represents both Registered Users and Admins.
- `id`: UUID (Primary Key)
- `email`: String (Unique, Indexed)
- `password_hash`: String
- `name`: String
- `role`: Enum ('user', 'admin')
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Category
Groups products together.
- `id`: UUID (Primary Key)
- `name`: String (Unique)
- `description`: Text
- `created_at`: Timestamp

### Product
Items for sale.
- `id`: UUID (Primary Key)
- `category_id`: UUID (Foreign Key -> Category.id)
- `name`: String (Indexed)
- `description`: Text
- `price`: Decimal (Scale: 2)
- `stock_level`: Integer (Default: 0)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Order
Tracks customer purchases.
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key -> User.id)
- `total_price`: Decimal (Scale: 2)
- `status`: Enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled')
- `order_date`: Timestamp
- `created_at`: Timestamp
- `updated_at`: Timestamp

### OrderItem
Individual items within an order.
- `id`: UUID (Primary Key)
- `order_id`: UUID (Foreign Key -> Order.id, Cascade Delete)
- `product_id`: UUID (Foreign Key -> Product.id)
- `quantity`: Integer
- `unit_price`: Decimal (Scale: 2)

## Relationships
- **User (1) <-> Order (N)**: A user can have many orders.
- **Category (1) <-> Product (N)**: A category can contain many products.
- **Order (1) <-> OrderItem (N)**: An order consists of multiple items.
- **Product (1) <-> OrderItem (N)**: A product can appear in many order items.

## State Transitions (Order Status)
- `pending` -> `paid` (On success simulation from provider)
- `pending` -> `cancelled` (On failure or user timeout)
- `paid` -> `shipped` (By Admin)
- `shipped` -> `delivered` (System/Admin update)
