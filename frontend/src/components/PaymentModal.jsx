import React, { useState } from 'react';

const PaymentModal = ({ isOpen, order, onConfirm, onCancel }) => {
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePay = () => {
        setProcessing(true);
        // Simulate external API call
        setTimeout(() => {
            setProcessing(false);
            onConfirm(order.id);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-2xl overflow-hidden">
                <header className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Secure Payment</h2>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        🔒 <span className="uppercase">SSL Encrypted</span>
                    </div>
                </header>

                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                        <p>Order ID: <strong>{order.id}</strong></p>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Total Amount</label>
                        <p className="text-2xl font-bold text-red-700">${parseFloat(order.total_price).toFixed(2)}</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Card Information</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 pl-10 bg-gray-50 cursor-not-allowed select-none text-gray-500"
                                value="**** **** **** 4242"
                                disabled
                            />
                            <span className="absolute left-3 top-2.5">💳</span>
                        </div>
                        <p className="text-xs text-gray-500">Using simulated payment provider (Mock Gateway).</p>
                    </div>
                </div>

                <footer className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={onCancel}
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 text-sm font-bold text-black bg-primary hover:bg-primary-hover border border-yellow-500 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={handlePay}
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin h-3 w-3 border-2 border-black border-t-transparent rounded-full"></span>
                                Processing...
                            </span>
                        ) : 'Place your order'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PaymentModal;
