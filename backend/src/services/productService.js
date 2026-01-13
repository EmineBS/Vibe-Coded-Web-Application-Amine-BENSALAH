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
        return models.product.create(data);
    },

    updateProduct: async (id, data) => {
        return models.product.update(id, data);
    },

    deleteProduct: async (id) => {
        return models.product.delete(id);
    },
});
