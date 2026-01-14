export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('order_items').del();
  await knex('orders').del();
  await knex('products').del();
  await knex('categories').del();

  const [electronicsId, homeId, fashionId] = await knex('categories').insert([
    { name: 'Electronics', description: 'Gadgets and gear' },
    { name: 'Home & Kitchen', description: 'Everything for your habitat' },
    { name: 'Fashion', description: 'Trending styles and accessories' }
  ]).returning('id');

  const electronics = electronicsId.id;
  const home = homeId.id;
  const fashion = fashionId.id;

  await knex('products').insert([
    {
      name: 'Pro Gaming Laptop',
      description: 'High performance gaming laptop with RTX 4080',
      price: 2499.99,
      stock_level: 15,
      category_id: electronics
    },
    {
      name: 'Noise Cancelling Headphones',
      description: 'Premium wireless headphones with active noise cancellation',
      price: 349.00,
      stock_level: 50,
      category_id: electronics
    },
    {
      name: '4K Ultra HD Monitor',
      description: '27-inch 4K monitor with vibrant colors and HDR support',
      price: 499.99,
      stock_level: 25,
      category_id: electronics
    },
    {
      name: 'Wireless Ergonomic Mouse',
      description: 'Precision wireless mouse designed for comfort',
      price: 65.00,
      stock_level: 80,
      category_id: electronics
    },
    {
      name: 'Mechanical Gaming Keyboard',
      description: 'RGB backlit mechanical keyboard with tactile switches',
      price: 129.00,
      stock_level: 40,
      category_id: electronics
    },
    {
      name: 'Modern Coffee Maker',
      description: 'Programmable drip coffee maker for the perfect morning',
      price: 89.50,
      stock_level: 30,
      category_id: home
    },
    {
      name: 'Digital Air Fryer',
      description: 'Large capacity air fryer with easy-to-use presets',
      price: 119.99,
      stock_level: 45,
      category_id: home
    },
    {
      name: 'High-Speed Blender',
      description: 'Powerful blender for smoothies and soups',
      price: 159.00,
      stock_level: 20,
      category_id: home
    },
    {
      name: 'Minimalist Wall Clock',
      description: 'Silent quartz movement wall clock in matte black',
      price: 45.00,
      stock_level: 100,
      category_id: home
    },
    {
      name: 'Canvas Tote Bag',
      description: 'Durable eco-friendly canvas bag for daily use',
      price: 25.00,
      stock_level: 200,
      category_id: fashion
    },
    {
      name: 'Classic Denim Jacket',
      description: 'Timeless denim jacket with a comfortable fit',
      price: 79.00,
      stock_level: 60,
      category_id: fashion
    },
    {
      name: 'Premium Cotton T-Shirt',
      description: 'Soft and breathable 100% cotton t-shirt',
      price: 19.99,
      stock_level: 150,
      category_id: fashion
    },
    {
      name: 'Lightweight Running Shoes',
      description: 'Breathable running shoes with superior cushioning',
      price: 95.00,
      stock_level: 75,
      category_id: fashion
    }
  ]);
}
