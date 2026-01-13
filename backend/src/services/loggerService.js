export const logSecurityEvent = (event, details) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        event,
        ...details,
    };

    // In a real production app, this would write to a DB table or a secure log aggregator
    console.log(`[SECURITY EVENT] ${JSON.stringify(logEntry)}`);
};

export const SECURITY_EVENTS = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    ACCOUNT_LOCKOUT: 'ACCOUNT_LOCKOUT',
    SENSITIVE_DATA_ACCESS: 'SENSITIVE_DATA_ACCESS',
    UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
};
