import knex from 'knex';
import config from './knexfile.mjs';

const db = knex(config.development);

async function check() {
    try {
        const migrations = await db('knex_migrations').select('*');
        console.log('Migrations:', migrations);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
