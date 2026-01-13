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
      name: 'Modern Coffee Maker',
      description: 'Programmable drip coffee maker for the perfect morning',
      price: 89.50,
      stock_level: 30,
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
    }
  ]);
}
