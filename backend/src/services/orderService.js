export const orderService = (db, models) => ({
    getUserOrders: async (userId) => {
        return models.order.findByUserId(userId);
    },

    getOrderDetails: async (orderId, userId) => {
        const order = await models.order.findById(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        // Security check: Ensure user owns the order (unless admin, but for now strict ownership)
        if (order.user_id !== userId) {
            throw new Error('Unauthorized access to order');
        }

        const items = await models.orderItem.findByOrderId(orderId);
        return { ...order, items };
    },

    getAllOrders: async () => {
        return models.order.findAll();
    },

    updateOrderStatus: async (orderId, status) => {
        const order = await models.order.findById(orderId);
        if (!order) throw new Error('Order not found');
        return models.order.updateStatus(orderId, status);
    }
});
