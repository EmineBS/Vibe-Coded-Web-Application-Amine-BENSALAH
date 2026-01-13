import express from 'express';
const router = express.Router();

export const productRoutes = (service) => {
    router.get('/', async (req, res, next) => {
        try {
            const { name, category_id } = req.query;
            const products = await service.getProducts({ name, category_id });
            res.json({ status: 'success', data: products });
        } catch (error) {
            next(error);
        }
    });

    router.get('/categories', async (req, res, next) => {
        try {
            const categories = await service.getCategories();
            res.json({ status: 'success', data: categories });
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const product = await service.getProductById(req.params.id);
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
