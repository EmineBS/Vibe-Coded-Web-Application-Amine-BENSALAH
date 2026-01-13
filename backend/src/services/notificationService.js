export const notify = async (type, recipient, data) => {
    const timestamp = new Date().toISOString();

    // Implementation for MVP: Log to console
    console.log(`[NOTIFICATION] [${timestamp}] [${type}] to ${recipient}: ${JSON.stringify(data)}`);

    // Real integration points (future):
    // switch(type) {
    //   case 'ORDER_CONFIRMATION': await sendEmail(recipient, 'Order Confirmation', data); break;
    //   case 'PASSWORD_RESET': await sendEmail(recipient, 'Reset Your Password', data); break;
    // }

    return true;
};

export const NOTIFICATION_TYPES = {
    ORDER_CONFIRMATION: 'ORDER_CONFIRMATION',
    SHIPPING_UPDATE: 'SHIPPING_UPDATE',
    WELCOME_EMAIL: 'WELCOME_EMAIL',
};
