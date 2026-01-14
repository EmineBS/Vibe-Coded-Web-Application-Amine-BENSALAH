import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api/products';
import { useAuth } from '../hooks/useAuth';

import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, logout } = useAuth();

    useEffect(() => {
        if (activeTab === 'products') {
            fetchProducts();
        }
    }, [activeTab]);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (err) {
            console.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`http://localhost:3000/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 204) {
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                alert('Delete failed');
            }
        } catch (err) {
            alert('Connection error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Admin Header */}
            <header className="bg-amazon-dark text-white px-6 py-3 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">v1.0</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={logout} className="text-sm font-medium hover:text-primary transition-colors">Logout</button>
                </div>
            </header>

            <div className="max-w-screen-2xl mx-auto p-6">
                {/* Tabs */}
                <nav className="flex gap-4 border-b border-gray-200 mb-6">
                    <button
                        className={`pb-2 px-4 font-medium text-sm transition-colors ${activeTab === 'products' ? 'border-b-2 border-primary text-black' : 'text-gray-500 hover:text-gray-800'}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Products
                    </button>
                    <button
                        className={`pb-2 px-4 font-medium text-sm transition-colors ${activeTab === 'orders' ? 'border-b-2 border-primary text-black' : 'text-gray-500 hover:text-gray-800'}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders Management
                    </button>
                </nav>

                <main className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[600px]">
                    {activeTab === 'products' ? (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-gray-800">Product Catalog</h2>
                                <button className="bg-primary hover:bg-primary-hover border border-yellow-500 rounded-md py-1.5 px-4 text-sm text-black shadow-sm font-medium transition-colors">
                                    Add New Product
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center h-64 text-gray-500">Loading products...</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-600">
                                        <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-700">
                                            <tr>
                                                <th className="px-4 py-3">Name</th>
                                                <th className="px-4 py-3">Category</th>
                                                <th className="px-4 py-3">Price</th>
                                                <th className="px-4 py-3">Stock</th>
                                                <th className="px-4 py-3 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {products.map(p => (
                                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                                                    <td className="px-4 py-3">{p.category_name}</td>
                                                    <td className="px-4 py-3 text-gray-900 font-bold">${parseFloat(p.price).toFixed(2)}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.stock_level > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {p.stock_level}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-right space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1.5 rounded transition-colors">✏️</button>
                                                        <button className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1.5 rounded transition-colors" onClick={() => handleDelete(p.id)}>🗑️</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    ) : (
                        <AdminOrders />
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
