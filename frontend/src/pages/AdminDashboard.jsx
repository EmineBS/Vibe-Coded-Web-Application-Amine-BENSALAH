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
        <div className="admin-dashboard">
            <header className="admin-header glass">
                <h1>Admin Dashboard</h1>
                <div className="header-right">
                    <button className="logout-link" onClick={logout}>Logout</button>
                </div>
            </header>

            <nav className="admin-tabs">
                <button
                    className={activeTab === 'products' ? 'active' : ''}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                <button
                    className={activeTab === 'orders' ? 'active' : ''}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
            </nav>

            <main className="admin-content glass">
                {activeTab === 'products' ? (
                    <>
                        <div className="admin-actions">
                            <button className="add-btn">Add New Product</button>
                        </div>

                        {loading ? (
                            <div className="loader">Loading products...</div>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.name}</td>
                                            <td>{p.category_name}</td>
                                            <td>${parseFloat(p.price).toFixed(2)}</td>
                                            <td>{p.stock_level}</td>
                                            <td className="actions-cell">
                                                <button className="edit-icon">✏️</button>
                                                <button className="delete-icon" onClick={() => handleDelete(p.id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                ) : (
                    <AdminOrders />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
