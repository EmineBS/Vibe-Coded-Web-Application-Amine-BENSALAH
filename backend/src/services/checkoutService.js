import eventBus from './eventBus.js';
import { EVENTS } from '../constants/events.js';

export const checkoutService = (knex, models) => ({
    processOrder: async (userId, items) => {
        const order = await knex.transaction(async (trx) => {
            let totalPrice = 0;
            const orderItemsToCreate = [];

            for (const item of items) {
                const product = await trx('products').where({ id: item.product_id }).forUpdate().first();

                if (!product) {
                    throw new Error(`Product ${item.product_id} not found`);
                }

                if (product.stock_level < item.quantity) {
                    throw new Error(`Insufficient stock for product ${product.name}`);
                }

                totalPrice += parseFloat(product.price) * item.quantity;
                orderItemsToCreate.push({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: product.price
                });
            }

            // Create Order
            const [order] = await trx('orders').insert({
                user_id: userId,
                total_price: totalPrice,
                status: 'pending'
            }).returning('*');

            // Create Order Items
            const itemsWithOrderId = orderItemsToCreate.map(i => ({ ...i, order_id: order.id }));
            await trx('order_items').insert(itemsWithOrderId);

            return order;
        });

        eventBus.publish(EVENTS.ORDER_PLACED, { order_id: order.id, user_id: userId, total_price: order.total_price });

        return order;
    },

    confirmPayment: async (orderId) => {
        const updatedOrder = await knex.transaction(async (trx) => {
            const order = await trx('orders').where({ id: orderId }).first();
            if (!order) throw new Error('Order not found');
            if (order.status !== 'pending') throw new Error('Order already processed');

            const items = await trx('order_items').where({ order_id: orderId });

            for (const item of items) {
                // Decrement stock at purchase (Confirmed Payment)
                await trx('products')
                    .where({ id: item.product_id })
                    .decrement('stock_level', item.quantity);
            }

            const [updatedOrder] = await trx('orders')
                .where({ id: orderId })
                .update({ status: 'paid' })
                .returning('*');

            return updatedOrder;
        });

        eventBus.publish(EVENTS.PAYMENT_COMPLETED, { order_id: updatedOrder.id, user_id: updatedOrder.user_id });

        return updatedOrder;
    }
});
