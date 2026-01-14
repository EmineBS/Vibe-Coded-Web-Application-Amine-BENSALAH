import express from 'express';
import { validate } from '../../middleware/validate.js';
import { authenticate, authorize } from '../../middleware/rbac.js';
import { z } from 'zod';
import { cache } from '../../utils/cache.js';

const productSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        description: z.string().optional(),
        price: z.number().positive(),
        stock_level: z.number().int().min(0),
        category_id: z.string().uuid(),
    }),
});

export const adminRoutes = (pService, oService) => {
    const router = express.Router();

    // All routes require admin role
    router.use(authenticate, authorize(['admin']));

    // --- Product Management ---
    router.post('/products', validate(productSchema), async (req, res, next) => {
        try {
            const [product] = await pService.createProduct(req.body);
            // Invalidate list cache
            await cache.del(cache.keys.productList);
            res.status(201).json({ status: 'success', data: product });
        } catch (err) {
            next(err);
        }
    });

    router.patch('/products/:id', async (req, res, next) => {
        try {
            const [product] = await pService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' });
            }
            // Invalidate list and specific product cache
            await cache.del(cache.keys.productList);
            await cache.del(cache.keys.productDetail(req.params.id));
            res.json({ status: 'success', data: product });
        } catch (err) {
            next(err);
        }
    });

    router.delete('/products/:id', async (req, res, next) => {
        try {
            await pService.deleteProduct(req.params.id);
            // Invalidate list and specific product cache
            await cache.del(cache.keys.productList);
            await cache.del(cache.keys.productDetail(req.params.id));
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    });

    // --- Order Fulfillment ---
    router.get('/orders', async (req, res, next) => {
        try {
            const orders = await oService.getAllOrders();
            res.json({ status: 'success', data: orders });
        } catch (err) {
            next(err);
        }
    });

    router.patch('/orders/:id/status', async (req, res, next) => {
        try {
            const { status } = req.body;
            const [order] = await oService.updateOrderStatus(req.params.id, status);
            res.json({ status: 'success', data: order });
        } catch (err) {
            if (err.message.includes('not found')) return res.status(404).json({ status: 'error', message: err.message });
            next(err);
        }
    });

    return router;
};
