import knex from 'knex';
import config from './knexfile.mjs';

const db = knex(config.development);

async function increaseStock() {
    try {
        const result = await db('products').update({ stock_level: 500 });
        console.log(`Updated ${result} products to 500 stock.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

increaseStock();
