import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.error('Redis: Max retries reached. Connection failed.');
                return new Error('Redis: Max retries reached');
            }
            // Exponential backoff
            return Math.min(retries * 50, 2000);
        }
    }
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));
client.on('ready', () => console.log('Redis Client Ready'));

export const connectRedis = async () => {
    try {
        if (!client.isOpen) {
            await client.connect();
        }
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
};

export const disconnectRedis = async () => {
    if (client.isOpen) {
        await client.quit();
    }
};

export default client;
