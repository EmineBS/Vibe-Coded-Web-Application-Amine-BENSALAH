import React, { useState, useEffect } from 'react';

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
        <div className="modal-overlay">
            <div className="modal-content glass payment-modal">
                <header className="modal-header">
                    <h2>Secure Payment</h2>
                    <p className="subtitle">Simulating SecureBank Gateway</p>
                </header>

                <div className="payment-details">
                    <p>Order ID: <strong>{order.id}</strong></p>
                    <p>Amount to Pay: <strong className="amount">${parseFloat(order.total_price).toFixed(2)}</strong></p>

                    <div className="mock-card-input">
                        <label>Card Number</label>
                        <input type="text" placeholder="**** **** **** 4242" disabled />
                    </div>
                </div>

                <footer className="modal-footer">
                    <button
                        className="pay-btn"
                        onClick={handlePay}
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : 'Pay Now'}
                    </button>
                    <button
                        className="cancel-link"
                        onClick={onCancel}
                        disabled={processing}
                    >
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PaymentModal;
