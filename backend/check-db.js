import knex from 'knex';
import config from './knexfile.mjs';

const db = knex(config.development);

async function check() {
    try {
        const tables = await db.raw("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public'");
        console.log('Tables:', tables.rows.map(r => r.tablename));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
