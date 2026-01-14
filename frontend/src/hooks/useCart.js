import { useState, useEffect } from 'react';

export const useCart = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product_id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product_id === product.id
                        ? { ...item, quantity: item.quantity + 1, image_url: product.image_url }
                        : item
                );
            }
            return [...prev, { product_id: product.id, name: product.name, price: product.price, image_url: product.image_url, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.product_id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) return removeFromCart(productId);
        setCart((prev) =>
            prev.map((item) =>
                item.product_id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
    };
};
