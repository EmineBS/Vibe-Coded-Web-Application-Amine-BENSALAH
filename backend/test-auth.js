async function testAuth() {
    console.log('--- Testing Registration ---');
    try {
        const regRes = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: `test_${Date.now()}@example.com`,
                password: 'password123'
            })
        });
        console.log('Reg Status:', regRes.status);
        const regData = await regRes.json();
        console.log('Reg Data:', regData);

        if (regRes.status === 201) {
            console.log('\n--- Testing Login ---');
            const loginRes = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: regData.data.email,
                    password: 'password123'
                })
            });
            console.log('Login Status:', loginRes.status);
            const loginData = await loginRes.json();
            console.log('Login Data:', loginData);
        }
    } catch (err) {
        console.error('Test Failed:', err);
    }
}

testAuth();
