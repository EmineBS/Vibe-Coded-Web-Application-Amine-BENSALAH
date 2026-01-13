import 'dotenv/config';
export default {
    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/ecommerce_db',
        migrations: {
            directory: './src/db/migrations',
            loadExtensions: ['.mjs']
        },
        seeds: {
            directory: './src/db/seeds',
            loadExtensions: ['.mjs']
        }
    }
};
