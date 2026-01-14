import express from 'express';
import { withCache, cache } from '../../utils/cache.js';

const router = express.Router();

export const categoryRoutes = (service) => {
    router.get('/', async (req, res, next) => {
        try {
            const categories = await withCache(cache.keys.categoryList, async () => {
                return await service.getCategories();
            });
            res.json({ status: 'success', data: categories });
        } catch (error) {
            next(error);
        }
    });

    return router;
};
