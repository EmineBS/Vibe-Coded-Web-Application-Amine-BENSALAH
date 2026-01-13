import knex from 'knex';
import config from './knexfile.mjs';

const db = knex(config.development);

async function check() {
    try {
        const products = await db('products').select('id', 'name', 'stock_level');
        console.log('Products in DB:', products);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
