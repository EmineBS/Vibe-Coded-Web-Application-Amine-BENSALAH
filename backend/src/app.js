import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import db from './db/index.js';
import { productModel, categoryModel, orderModel, orderItemModel } from './models/models.js';
import { productService } from './services/productService.js';
import { checkoutService } from './services/checkoutService.js';
import { orderService } from './services/orderService.js';
import { authService } from './services/authService.js';
import { productRoutes } from './api/routes/products.js';
import { orderRoutes } from './api/routes/orders.js';
import { userRoutes } from './api/routes/users.js';
import { adminRoutes } from './api/routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';
import { standardLimiter } from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use(standardLimiter);

// Models & Services
const models = {
    product: productModel(db),
    category: categoryModel(db),
    order: orderModel(db),
    orderItem: orderItemModel(db),
};
const pService = productService(db, models);
const cService = checkoutService(db, models);
const oService = orderService(db, models);

// Routes
app.use('/api/products', productRoutes(pService));
app.use('/api/orders', orderRoutes(cService, oService));
app.use('/api/auth', userRoutes(db, authService));
app.use('/api/admin', adminRoutes(pService, oService));

// Health Check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, res) => res.status(404).json({ status: 'error', message: 'Not Found' }));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
