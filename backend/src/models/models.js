export const productModel = (knex) => ({
    findAll: (filters = {}) => {
        let query = knex('products')
            .select('products.*', 'categories.name as category_name')
            .leftJoin('categories', 'products.category_id', 'categories.id');

        if (filters.name) {
            query = query.where('products.name', 'ilike', `%${filters.name}%`);
        }

        if (filters.category_id) {
            query = query.where('products.category_id', filters.category_id);
        }

        return query;
    },

    findById: (id) => {
        return knex('products')
            .select('products.*', 'categories.name as category_name')
            .leftJoin('categories', 'products.category_id', 'categories.id')
            .where('products.id', id)
            .first();
    },

    create: (data) => {
        return knex('products').insert(data).returning('*');
    },

    update: (id, data) => {
        return knex('products').where({ id }).update(data).returning('*');
    },

    delete: (id) => {
        return knex('products').where({ id }).del();
    },
});

export const categoryModel = (knex) => ({
    findAll: () => {
        return knex('categories').select('*');
    },

    findById: (id) => {
        return knex('categories').where({ id }).first();
    },

    create: (data) => {
        return knex('categories').insert(data).returning('*');
    },

    update: (id, data) => {
        return knex('categories').where({ id }).update(data).returning('*');
    },

    delete: (id) => {
        return knex('categories').where({ id }).del();
    },
});

export const orderModel = (knex) => ({
    create: (data) => {
        return knex('orders').insert(data).returning('*');
    },

    findById: (id) => {
        return knex('orders').where({ id }).first();
    },

    findByUserId: (userId) => {
        return knex('orders').where({ user_id: userId }).orderBy('created_at', 'desc');
    },

    findAll: () => {
        return knex('orders').select('*').orderBy('created_at', 'desc');
    },

    updateStatus: (id, status) => {
        return knex('orders').where({ id }).update({ status }).returning('*');
    },
});

export const orderItemModel = (knex) => ({
    createMany: (items) => {
        return knex('order_items').insert(items).returning('*');
    },

    findByOrderId: (orderId) => {
        return knex('order_items')
            .select('order_items.*', 'products.name as product_name', 'products.image_url')
            .leftJoin('products', 'order_items.product_id', 'products.id')
            .where({ order_id: orderId });
    },
});
