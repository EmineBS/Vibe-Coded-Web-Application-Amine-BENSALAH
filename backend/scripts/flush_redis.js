import { createClient } from 'redis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '../.env');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function flushCache() {
    try {
        await client.connect();
        console.log('Connected to Redis');

        console.log('Flushing all keys...');
        await client.flushAll();

        console.log('Redis cache cleared successfully.');
    } catch (err) {
        console.error('Error flushing cache:', err);
    } finally {
        await client.disconnect();
    }
}

flushCache();
