import eventBus from './eventBus.js';
import { EVENTS } from '../constants/events.js';

export const productService = (knex, models) => ({
    getProducts: async (filters) => {
        return models.product.findAll(filters);
    },

    getProductById: async (id) => {
        return models.product.findById(id);
    },

    getCategories: async () => {
        return models.category.findAll();
    },

    // Admin CRUD
    createProduct: async (data) => {
        const result = await models.product.create(data);
        const [product] = result;
        eventBus.publish(EVENTS.PRODUCT_CREATED, { id: product.id, name: product.name });
        return result;
    },

    updateProduct: async (id, data) => {
        const result = await models.product.update(id, data);
        const [product] = result;
        if (product) {
            eventBus.publish(EVENTS.PRODUCT_UPDATED, { id: product.id, name: product.name });
        }
        return result;
    },

    deleteProduct: async (id) => {
        const result = await models.product.delete(id);
        eventBus.publish(EVENTS.PRODUCT_DELETED, { id });
        return result;
    },
});
