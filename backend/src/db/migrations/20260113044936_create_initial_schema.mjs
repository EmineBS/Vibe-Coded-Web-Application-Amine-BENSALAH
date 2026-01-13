export async function up(knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid());
            table.string('name').notNullable();
            table.string('email').unique().notNullable();
            table.string('password_hash').notNullable();
            table.enum('role', ['admin', 'user']).defaultTo('user');
            table.integer('login_attempts').defaultTo(0);
            table.timestamp('lockout_until').nullable();
            table.timestamps(true, true);
        })
        .createTable('categories', (table) => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid());
            table.string('name').unique().notNullable();
            table.string('description');
        })
        .createTable('products', (table) => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid());
            table.string('name').notNullable();
            table.text('description');
            table.decimal('price', 10, 2).notNullable();
            table.integer('stock_level').defaultTo(0);
            table.uuid('category_id').references('id').inTable('categories').onDelete('CASCADE');
            table.timestamps(true, true);
        })
        .createTable('orders', (table) => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid());
            table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL');
            table.decimal('total_price', 10, 2).notNullable();
            table.enum('status', ['pending', 'paid', 'shipped', 'delivered', 'cancelled']).defaultTo('pending');
            table.timestamps(true, true);
        })
        .createTable('order_items', (table) => {
            table.uuid('id').primary().defaultTo(knex.fn.uuid());
            table.uuid('order_id').references('id').inTable('orders').onDelete('CASCADE');
            table.uuid('product_id').references('id').inTable('products');
            table.integer('quantity').notNullable();
            table.decimal('unit_price', 10, 2).notNullable();
        });
}

export async function down(knex) {
    return knex.schema
        .dropTableIfExists('order_items')
        .dropTableIfExists('orders')
        .dropTableIfExists('products')
        .dropTableIfExists('categories')
        .dropTableIfExists('users');
}
