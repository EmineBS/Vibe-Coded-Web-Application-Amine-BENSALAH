import React from 'react';

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, cartTotal, onCheckout }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-2xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <header className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                    <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                    <button className="text-gray-400 hover:text-gray-600 text-2xl leading-none" onClick={onClose}>&times;</button>
                </header>

                {/* Items */}
                <div className="overflow-y-auto p-6 flex-grow space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center py-10">
                            <span className="text-4xl block mb-2">🛒</span>
                            <p className="text-gray-500 text-lg">Your cart is empty.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product_id} className="flex gap-4 items-center border-b border-gray-100 pb-4 last:border-0 text-black">
                                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold text-gray-400 overflow-hidden border border-gray-200">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="object-contain w-full h-full mix-blend-multiply" />
                                    ) : (
                                        <span>IMG</span>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                                    <p className="text-red-700 font-bold text-sm">${parseFloat(item.price).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 rounded-md border border-gray-200 p-1">
                                    <button
                                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-sm font-bold hover:bg-gray-100"
                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-sm font-bold hover:bg-gray-100"
                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="text-gray-400 hover:text-red-600 p-1"
                                    onClick={() => removeFromCart(item.product_id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <footer className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-700">Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items):</span>
                            <span className="font-bold text-xl text-red-700">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full bg-primary hover:bg-primary-hover text-black font-medium py-2 rounded-md shadow-sm border border-yellow-500 transition-colors cursor-pointer"
                            onClick={onCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default CartModal;
