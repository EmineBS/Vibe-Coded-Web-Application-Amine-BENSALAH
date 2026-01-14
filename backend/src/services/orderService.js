export const orderService = (db, models) => ({
    getUserOrders: async (userId) => {
        const orders = await models.order.findByUserId(userId);
        return Promise.all(orders.map(async (order) => {
            const items = await models.orderItem.findByOrderId(order.id);
            // console.log(`Order ${order.id} items:`, items.length, items[0]); 
            return { ...order, items };
        }));
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
