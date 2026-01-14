import eventBus from '../services/eventBus.js';
import { EVENTS } from '../constants/events.js';
import { logSecurityEvent, SECURITY_EVENTS } from '../services/loggerService.js';

export const initSecuritySubscriber = () => {
    // Audit user registrations
    eventBus.subscribe(EVENTS.USER_REGISTERED, (data) => {
        logSecurityEvent(SECURITY_EVENTS.SENSITIVE_DATA_ACCESS, {
            action: 'USER_REGISTRATION',
            userId: data.id,
            email: data.email
        });
    });

    // Audit logins
    eventBus.subscribe(EVENTS.USER_LOGGED_IN, (data) => {
        logSecurityEvent(SECURITY_EVENTS.LOGIN_SUCCESS, {
            userId: data.id,
            email: data.email
        });
    });

    // Audit payment failures
    eventBus.subscribe(EVENTS.PAYMENT_FAILED, (data) => {
        logSecurityEvent(SECURITY_EVENTS.SENSITIVE_DATA_ACCESS, {
            action: 'PAYMENT_FAILURE',
            orderId: data.order_id,
            userId: data.user_id
        });
    });

    console.log('[Subscribers] Security Subscriber Initialized');
};

export default initSecuritySubscriber;
