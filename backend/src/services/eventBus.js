import { EventEmitter } from 'events';

class EventBus extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(20);
    }

    /**
     * Publish an event with a payload
     * @param {string} event 
     * @param {any} data 
     */
    publish(event, data) {
        console.log(`[Event] Publishing: ${event}`, data ? JSON.stringify(data).substring(0, 100) : '');
        this.emit(event, data);
    }

    /**
     * Subscribe to an event
     * @param {string} event 
     * @param {Function} handler 
     */
    subscribe(event, handler) {
        this.on(event, handler);
    }
}

// Singleton instance
const eventBus = new EventBus();

export default eventBus;
