import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getMyOrders } from '../services/api/orders';

const OrderHistory = ({ onBack }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await getMyOrders(token);
                if (result.status === 'success') {
                    setOrders(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError(err.message || 'Failed to load order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    return (
        <div className="order-history-page">
            <header className="admin-header glass">
                <h1>My Orders</h1>
                <button className="back-btn" onClick={onBack}>← Back to Store</button>
            </header>

            <main className="admin-content glass">
                {loading ? (
                    <div className="loader">Loading orders...</div>
                ) : error ? (
                    <div className="error-badge">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="empty-orders">
                        <p>No orders found yet.</p>
                        <button className="add-btn" onClick={onBack} style={{ marginTop: '1rem' }}>Start Shopping</button>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id.slice(0, 8)}</td>
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>${parseFloat(order.total_price).toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default OrderHistory;
