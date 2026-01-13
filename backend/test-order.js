async function testOrder() {
    try {
        const productRes = await fetch('http://localhost:3000/api/products');
        const products = await productRes.json();

        if (!products.data || products.data.length === 0) {
            console.error('No products found');
            return;
        }

        const payload = {
            userId: null,
            items: [
                { product_id: products.data[0].id, quantity: 1 }
            ]
        };

        console.log('Sending payload:', JSON.stringify(payload, null, 2));

        const res = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log('Status Code:', res.status);
        const result = await res.json();
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Error during fetch:', err);
    }
}

testOrder();
