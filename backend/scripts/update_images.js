import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '../.env');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

console.log(`Attempting to update images using DB URL: ${process.env.DATABASE_URL?.split('@')[1] || 'hidden'}`); // Log host part safely

// High quality public image URLs (Unsplash/LoremFlickr/Etc)
const CATEGORY_IMAGES = {
    'Electronics': [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800', // Smartwatch
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800', // Phone
        'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800', // Laptop
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800', // Macbook
        'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80&w=800'  // Camera
    ],
    'Books': [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', // Book stack
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800', // Open book
        'https://images.unsplash.com/photo-1614849963640-9b930ea2e836?auto=format&fit=crop&q=80&w=800', // Reading
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800', // Library
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'  // Book cover
    ],
    'Clothing': [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', // T-shirt
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800', // Jacket
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800', // Jeans
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800', // Hoodie
        'https://images.unsplash.com/photo-1620799140408-ed5341cdb4f3?auto=format&fit=crop&q=80&w=800'  // Shirt
    ],
    'Home & Kitchen': [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800', // Kitchen
        'https://images.unsplash.com/photo-1517915991140-d260dcdb0757?auto=format&fit=crop&q=80&w=800', // Chair
        'https://images.unsplash.com/photo-1517254797898-04ecd2242f94?auto=format&fit=crop&q=80&w=800', // Decor
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800', // Living room
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800'  // Lamp
    ]
};

// Fallback if category doesn't match
const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', // Headphones
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800', // Polaroid
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'  // Shoes
];

async function updateProductImages() {
    try {
        console.log('Connecting to database...');
        const client = await pool.connect();

        console.log('Ensuring image_url column exists...');
        await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT');

        console.log('Fetching products...');
        const res = await client.query(`
            SELECT p.id, p.name, c.name as category_name 
            FROM products p 
            JOIN categories c ON p.category_id = c.id
        `);

        const products = res.rows;
        console.log(`Found ${products.length} products to update.`);

        for (const product of products) {
            let imageUrl;
            const catName = product.category_name;

            // Get random image from category pool or default
            if (CATEGORY_IMAGES[catName]) {
                const pool = CATEGORY_IMAGES[catName];
                imageUrl = pool[Math.floor(Math.random() * pool.length)];
            } else {
                imageUrl = DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
            }

            // Update product
            await client.query('UPDATE products SET image_url = $1 WHERE id = $2', [imageUrl, product.id]);
            console.log(`Updated product ${product.id} (${product.name}) with image.`);
        }

        console.log('All product images updated successfully.');
        client.release();
    } catch (err) {
        console.error('Error updating images:', err);
    } finally {
        pool.end();
    }
}

updateProductImages();
