import React from 'react';

const CartModal = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, cartTotal, onCheckout }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
                <header className="modal-header">
                    <h2>Your Shopping Cart</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </header>

                <div className="cart-items-container">
                    {cart.length === 0 ? (
                        <p className="empty-msg">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.product_id} className="cart-item">
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                                </div>
                                <div className="item-controls">
                                    <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                                    <span className="qty">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>🗑️</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <footer className="modal-footer">
                        <div className="cart-total-footer">
                            <span>Total:</span>
                            <span className="total-val">${cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn-main" onClick={onCheckout}>Proceed to Checkout</button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default CartModal;
