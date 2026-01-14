import eventBus from '../services/eventBus.js';
import { EVENTS } from '../constants/events.js';

export const initNotificationSubscriber = () => {
    // Notify on order placement
    eventBus.subscribe(EVENTS.ORDER_PLACED, (data) => {
        console.log(`[Notification] Order Confirmed: ${data.order_id} for User ${data.user_id}. Total: $${data.total_price}`);
    });

    // Notify on payment completion
    eventBus.subscribe(EVENTS.PAYMENT_COMPLETED, (data) => {
        console.log(`[Notification] Payment Received: Order ${data.order_id} is now being processed.`);
    });

    // Notify on registration
    eventBus.subscribe(EVENTS.USER_REGISTERED, (data) => {
        console.log(`[Notification] Welcome Email Sent to: ${data.email} (${data.name})`);
    });

    console.log('[Subscribers] Notification Subscriber Initialized');
};

export default initNotificationSubscriber;
