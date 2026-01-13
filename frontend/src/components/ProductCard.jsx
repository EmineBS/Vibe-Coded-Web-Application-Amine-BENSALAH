import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    // Mock rating and delivery info
    const rating = (Math.random() * (5 - 3.8) + 3.8).toFixed(1);
    const reviews = Math.floor(Math.random() * 5000) + 100;

    return (
        <div className="product-card amz-card">
            <div className="product-image">
                <div className="placeholder-img">Image</div>
            </div>
            <div className="product-info">
                <h3 className="amz-product-title">{product.name}</h3>
                <div className="amz-rating">
                    <span className="stars">{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
                    <span className="rating-count">{reviews}</span>
                </div>
                <div className="amz-price-container">
                    <span className="currency">$</span>
                    <span className="price-whole">{Math.floor(product.price)}</span>
                    <span className="price-fraction">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>
                <p className="amz-delivery">FREE delivery <span className="date">Tomorrow</span></p>
                <div className="amz-prime-tag">Antigravity Premium</div>
                <button
                    className="amz-add-btn"
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
