const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getProducts = async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/products?${query}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};

export const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
};
