import client from '../services/cacheService.js';

const DEFAULT_TTL = process.env.CACHE_TTL || 3600;

export const cache = {
    /**
     * Set a value in cache
     * @param {string} key 
     * @param {any} value 
     * @param {number} ttl 
     */
    async set(key, value, ttl = DEFAULT_TTL) {
        if (!client.isOpen) return;
        try {
            const data = JSON.stringify(value);
            await client.set(key, data, {
                EX: parseInt(ttl)
            });
        } catch (err) {
            console.error(`Cache set error [${key}]:`, err);
        }
    },

    /**
     * Get a value from cache
     * @param {string} key 
     * @returns {any|null}
     */
    async get(key) {
        if (!client.isOpen) return null;
        try {
            const data = await client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (err) {
            console.error(`Cache get error [${key}]:`, err);
            return null;
        }
    },

    /**
     * Delete a key from cache
     * @param {string} key 
     */
    async del(key) {
        if (!client.isOpen) return;
        try {
            await client.del(key);
        } catch (err) {
            console.error(`Cache del error [${key}]:`, err);
        }
    },

    /**
     * Standardized key generators
     */
    keys: {
        productList: 'store:products:list',
        productDetail: (id) => `store:product:${id}`,
        categoryList: 'store:categories:list'
    }
};

/**
 * Cache Wrapper to simplify pattern: check cache -> fetch -> save cache
 * @param {string} key 
 * @param {Function} fetchFn 
 * @param {number} ttl 
 */
export const withCache = async (key, fetchFn, ttl = DEFAULT_TTL) => {
    const cachedData = await cache.get(key);
    if (cachedData) {
        return cachedData;
    }

    const freshData = await fetchFn();
    if (freshData) {
        await cache.set(key, freshData, ttl);
    }
    return freshData;
};

export default cache;
