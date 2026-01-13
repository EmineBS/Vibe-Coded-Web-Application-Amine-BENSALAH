import React from 'react';

const Navbar = ({
    cartCount,
    onCartClick,
    onLoginClick,
    user,
    onLogout,
    onOrdersClick,
    theme,
    toggleTheme,
    categories,
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategorySelect
}) => {
    return (
        <nav className="navbar amz-header sticky">
            <div className="nav-container-main">
                <div className="nav-left-section">
                    <h2 className="logo" onClick={() => onCategorySelect('')} style={{ cursor: 'pointer' }}>
                        Antigravity
                    </h2>
                    <div className="nav-locate">
                        <span className="locate-icon">📍</span>
                        <div className="locate-text">
                            <span className="locate-label">Deliver to</span>
                            <span className="locate-name">User Location</span>
                        </div>
                    </div>
                </div>

                <div className="nav-fill-section">
                    <div className="nav-search-bar">
                        <select
                            className="nav-search-category"
                            value={selectedCategory}
                            onChange={(e) => onCategorySelect(e.target.value)}
                        >
                            <option value="">All</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="nav-search-input"
                            placeholder="Search Antigravity"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <button className="nav-search-submit">🔍</button>
                    </div>
                </div>

                <div className="nav-right-section">
                    <button className="theme-toggle nav-item" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <div className="nav-auth nav-item" onClick={user ? null : onLoginClick}>
                        <span className="nav-line-1">Hello, {user ? user.name : 'sign in'}</span>
                        <span className="nav-line-2">Account & Lists</span>
                        {user && (
                            <div className="nav-auth-dropdown">
                                <button onClick={onOrdersClick}>Returns & Orders</button>
                                <button onClick={onLogout} className="logout-btn">Sign Out</button>
                            </div>
                        )}
                    </div>

                    <div className="nav-orders nav-item" onClick={onOrdersClick}>
                        <span className="nav-line-1">Returns</span>
                        <span className="nav-line-2">& Orders</span>
                    </div>

                    <div className="nav-cart nav-item" onClick={onCartClick}>
                        <div className="nav-cart-count-container">
                            <span className="nav-cart-count">{cartCount}</span>
                            <span className="nav-cart-icon">🛒</span>
                        </div>
                        <span className="nav-cart-text">Cart</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
