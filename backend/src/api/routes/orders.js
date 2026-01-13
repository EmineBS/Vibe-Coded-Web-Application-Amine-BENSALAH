import express from 'express';
import { authenticate } from '../../middleware/rbac.js';

export const orderRoutes = (checkoutService, orderService) => {
    const router = express.Router();

    // Create Order (Requires Auth)
    router.post('/', authenticate, async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { items } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ status: 'error', message: 'Cart is empty' });
            }

            const order = await checkoutService.processOrder(userId, items);
            res.status(201).json({ status: 'success', data: order });
        } catch (error) {
            next(error);
        }
    });

    // Confirm Payment (Simulated)
    router.post('/:id/confirm', async (req, res, next) => {
        try {
            const order = await checkoutService.confirmPayment(req.params.id);
            res.json({ status: 'success', data: order });
        } catch (error) {
            next(error);
        }
    });

    // Get User's Order History (Requires Auth)
    router.get('/me', authenticate, async (req, res, next) => {
        try {
            const orders = await orderService.getUserOrders(req.user.id);
            res.json({ status: 'success', data: orders });
        } catch (error) {
            next(error);
        }
    });

    // Get Order Details (Requires Auth)
    router.get('/:id', authenticate, async (req, res, next) => {
        try {
            const order = await orderService.getOrderDetails(req.params.id, req.user.id);
            res.json({ status: 'success', data: order });
        } catch (error) {
            if (error.message.includes('not found')) return res.status(404).json({ status: 'error', message: error.message });
            if (error.message.includes('Unauthorized')) return res.status(403).json({ status: 'error', message: error.message });
            next(error);
        }
    });

    return router;
};
