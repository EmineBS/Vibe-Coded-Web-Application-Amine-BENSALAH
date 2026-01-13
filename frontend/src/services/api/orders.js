const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createOrder = async (token, items) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items }),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to create order');
    }
    return response.json();
};

export const confirmPayment = async (token, orderId) => {
    const response = await fetch(`${API_URL}/orders/${orderId}/confirm`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to confirm payment');
    }
    return response.json();
};

export const getMyOrders = async (token) => {
    const response = await fetch(`${API_URL}/orders/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to fetch orders');
    }
    return response.json();
};
