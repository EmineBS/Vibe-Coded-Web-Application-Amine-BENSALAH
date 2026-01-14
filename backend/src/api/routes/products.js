import express from 'express';
import { withCache, cache } from '../../utils/cache.js';

const router = express.Router();

export const productRoutes = (service) => {
    router.get('/', async (req, res, next) => {
        try {
            const { name, category_id } = req.query;

            // If filters are applied, we might want to bypass list cache or use complex keys
            // For now, let's cache the basic list if no filters are present
            if (!name && !category_id) {
                const products = await withCache(cache.keys.productList, async () => {
                    return await service.getProducts({});
                });
                return res.json({ status: 'success', data: products });
            }

            const products = await service.getProducts({ name, category_id });
            res.json({ status: 'success', data: products });
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;

            // Simple UUID v4 regex check to prevent DB errors on legacy paths
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                return res.status(404).json({ status: 'error', message: 'Invalid product ID format' });
            }

            const product = await withCache(cache.keys.productDetail(id), async () => {
                return await service.getProductById(id);
            });

            if (!product) {
                return res.status(404).json({ status: 'error', message: 'Product not found' });
            }
            res.json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    });

    return router;
};
