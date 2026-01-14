import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3000/api/admin/orders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            if (result.status === 'success') {
                setOrders(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [token]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                fetchOrders();
            } else {
                alert('Failed to update status');
            }
        } catch (err) {
            alert('Error updating status');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;
    if (error) return <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">{error}</div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Order Management</h2>
                <div className="text-sm text-gray-500">Total Orders: {orders.length}</div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">User ID</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                                <td className="px-4 py-3 text-xs">{order.user_id ? order.user_id.slice(0, 8) + '...' : 'Guest'}</td>
                                <td className="px-4 py-3 font-bold text-gray-900">${parseFloat(order.total_price).toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider
                                        ${order.status === 'paid' ? 'bg-blue-100 text-blue-800' : ''}
                                        ${order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' : ''}
                                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                        ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                                     `}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                        className="bg-white border border-gray-300 text-gray-700 py-1 px-2 rounded-md text-xs focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
