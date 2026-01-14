/**
 * Core Domain Events for the E-commerce Platform
 */
export const EVENTS = {
    // Auth & User
    USER_REGISTERED: 'user.registered',
    USER_LOGGED_IN: 'user.logged_in',
    USER_LOCKED_OUT: 'user.locked_out',

    // Catalog & Inventory
    PRODUCT_CREATED: 'product.created',
    PRODUCT_UPDATED: 'product.updated',
    PRODUCT_DELETED: 'product.deleted',
    STOCK_LOW: 'stock.low',

    // Orders & Checkout
    ORDER_PLACED: 'order.placed',
    PAYMENT_COMPLETED: 'payment.completed',
    PAYMENT_FAILED: 'payment.failed'
};

export default EVENTS;
