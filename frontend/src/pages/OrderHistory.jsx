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
        <div className="min-h-screen bg-white">
            <div className="max-w-screen-lg mx-auto p-4 md:p-8">
                {/* Breadcrumb / Header */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="hover:underline cursor-pointer" onClick={onBack}>Your Account</span>
                    <span>›</span>
                    <span className="text-link font-bold">Your Orders</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h1 className="text-3xl font-normal text-gray-900">Your Orders</h1>
                    <div className="mt-2 md:mt-0 relative">
                        <input
                            type="text"
                            placeholder="Search all orders"
                            className="border border-gray-400 rounded-md px-3 py-1.5 w-64 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none text-sm"
                        />
                        <button className="absolute right-0 top-0 h-full px-3 bg-gray-800 text-white rounded-r-md text-sm font-bold">
                            Search
                        </button>
                    </div>
                </div>

                {/* Tags/Tabs */}
                <div className="border-b border-gray-200 mb-6 text-sm font-medium flex gap-6 text-gray-800">
                    <span className="border-b-2 border-orange-400 pb-2 cursor-pointer font-bold">Orders</span>
                    <span className="pb-2 cursor-pointer text-link hover:text-red-700 hover:underline">Buy Again</span>
                    <span className="pb-2 cursor-pointer text-link hover:text-red-700 hover:underline">Not Yet Shipped</span>
                    <span className="pb-2 cursor-pointer text-link hover:text-red-700 hover:underline">Cancelled Orders</span>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                        {error}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
                        <p className="text-gray-700 text-lg mb-4">You have not placed any orders yet.</p>
                        <button
                            className="bg-primary hover:bg-primary-hover border border-yellow-500 rounded-md py-1.5 px-4 text-sm text-black shadow-sm"
                            onClick={onBack}
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order.id} className="border border-gray-300 rounded-md overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-gray-100 p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between text-sm text-gray-600">
                                    <div className="flex gap-8">
                                        <div className="flex flex-col">
                                            <span className="uppercase text-xs font-bold">Order Placed</span>
                                            <span className="text-gray-900">{new Date(order.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="uppercase text-xs font-bold">Total</span>
                                            <span className="text-gray-900">${parseFloat(order.total_price).toFixed(2)}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="uppercase text-xs font-bold">Ship To</span>
                                            <span className="text-gray-900">Use Name</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-gray-900">
                                            Order # <span className="text-gray-500">{order.id}</span>
                                        </div>
                                        <div className="flex gap-3 text-link text-xs mt-1">
                                            <span className="hover:underline cursor-pointer hover:text-red-700">View order details</span>
                                            <span className="text-gray-300">|</span>
                                            <span className="hover:underline cursor-pointer hover:text-red-700">Invoice</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="p-6 flex flex-col md:flex-row gap-6">
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-lg mb-4 text-gray-900">
                                            {order.status === 'Delivered' ? 'Delivered' : order.status}
                                        </h3>
                                        <div className="space-y-4">
                                            {order.items && order.items.map(item => (
                                                <div key={item.id} className="flex gap-4 items-start">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-sm flex items-center justify-center text-xs text-gray-400 overflow-hidden flex-shrink-0 border border-gray-200 p-1">
                                                        {item.image_url ? (
                                                            <img src={item.image_url} alt={item.product_name} className="object-contain w-full h-full mix-blend-multiply" />
                                                        ) : (
                                                            <span>IMG</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <a href="#" className="text-link text-sm hover:underline hover:text-red-700 font-medium line-clamp-2">{item.product_name}</a>
                                                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                                        <div className="mt-2 text-sm">
                                                            <button className="bg-primary hover:bg-primary-hover border border-yellow-500 rounded-md py-1 px-3 shadow-sm inline-block text-xs">Buy it again</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:w-64 space-y-2 flex-shrink-0">
                                        <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 rounded-md py-1.5 text-sm shadow-sm cursor-pointer">Track package</button>
                                        <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 rounded-md py-1.5 text-sm shadow-sm cursor-pointer">Write a product review</button>
                                        <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 rounded-md py-1.5 text-sm shadow-sm cursor-pointer">Leave seller feedback</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
