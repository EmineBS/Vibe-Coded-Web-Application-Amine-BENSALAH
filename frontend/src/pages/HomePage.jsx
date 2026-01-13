import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api/products';
import { createOrder, confirmPayment } from '../services/api/orders';
import ProductGrid from '../components/ProductGrid';
import Navbar from '../components/Navbar';
import CartModal from '../components/CartModal';
import PaymentModal from '../components/PaymentModal';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const HomePage = ({ onLoginClick, onOrdersClick, theme, toggleTheme }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);
    const [filters, setFilters] = useState({
        name: '',
        category_id: '',
    });

    const { user, token, logout } = useAuth();
    const { cart, addToCart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [productsRes, categoriesRes] = await Promise.all([
                    getProducts(filters),
                    getCategories(),
                ]);
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [filters]);

    const handleSearchChange = (e) => {
        setFilters((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleCategorySelect = (categoryId) => {
        setFilters((prev) => ({ ...prev, category_id: categoryId }));
    };

    const handleCheckout = async () => {
        if (!user || !token) {
            alert('Please login to checkout');
            onLoginClick();
            return;
        }
        try {
            const res = await createOrder(token, cart);
            setActiveOrder(res.data);
            setIsCartOpen(false);
        } catch (err) {
            alert('Checkout failed: ' + err.message);
        }
    };

    const handlePaymentConfirm = async (orderId) => {
        try {
            await confirmPayment(token, orderId);
            alert('Payment Successful! Thank you for your order.');
            setActiveOrder(null);
            clearCart();
        } catch (err) {
            alert('Payment confirmation failed: ' + err.message);
        }
    };

    return (
        <div className="home-page amz-layout">
            <Navbar
                cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                onCartClick={() => setIsCartOpen(true)}
                onLoginClick={onLoginClick}
                onOrdersClick={onOrdersClick}
                user={user}
                onLogout={logout}
                theme={theme}
                toggleTheme={toggleTheme}
                categories={categories}
                searchTerm={filters.name}
                onSearchChange={(val) => setFilters(prev => ({ ...prev, name: val }))}
                selectedCategory={filters.category_id}
                onCategorySelect={handleCategorySelect}
            />

            <main className="content-main">
                <section className="products-grid-container">
                    {loading ? (
                        <div className="loader">Loading products...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <ProductGrid products={products} onAddToCart={addToCart} />
                    )}
                </section>
            </main>

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                cartTotal={cartTotal}
                onCheckout={handleCheckout}
            />

            <PaymentModal
                isOpen={!!activeOrder}
                order={activeOrder}
                onConfirm={handlePaymentConfirm}
                onCancel={() => setActiveOrder(null)}
            />
        </div>
    );
};

export default HomePage;
