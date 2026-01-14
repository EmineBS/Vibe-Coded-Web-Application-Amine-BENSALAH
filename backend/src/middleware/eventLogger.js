import eventBus from '../services/eventBus.js';

/**
 * Event Logger Middleware
 * Subscribes to all events (using internal _events if needed, but here we'll log specifically in the bus)
 * For simplicity, we'll just subscribe to everything or rely on the publish console log.
 * This middleware could also record events to a persistent audit trail.
 */
export const initEventLogger = () => {
    // In a real system, we might use a wildcard or a more sophisticated logger
    // For now, our publish method already logs, but we could add more details here
    console.log('[Event System] Logging initialized.');
};

export default initEventLogger;
