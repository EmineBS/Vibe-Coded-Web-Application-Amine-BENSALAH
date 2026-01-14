import React, { useState } from 'react';

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
        <nav className="bg-amazon-dark text-white sticky top-0 z-50">
            {/* Main Nav Top Layer */}
            <div className="flex items-center gap-2 p-2 max-w-screen-2xl mx-auto">

                {/* Logo */}
                <div className="p-2 border border-transparent hover:border-white rounded-sm cursor-pointer" onClick={() => onCategorySelect('')}>
                    <h2 className="text-2xl font-bold font-sans tracking-tight pt-1">Antigravity</h2>
                </div>

                {/* Location - Hidden on small mobile */}
                <div className="hidden md:flex flex-col p-2 border border-transparent hover:border-white rounded-sm cursor-pointer leading-tight">
                    <span className="text-xs text-gray-300 pl-4 relative">
                        <span className="absolute left-0 top-0">📍</span>
                        Deliver to
                    </span>
                    <span className="text-sm font-bold">User Location</span>
                </div>

                {/* Search Bar */}
                <div className="flex-grow flex h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-primary">
                    <select
                        className="w-16 md:w-auto bg-gray-100 text-black text-xs border-r border-gray-300 outline-none px-2 cursor-pointer hover:bg-gray-200"
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
                        className="flex-grow px-3 py-2 text-black outline-none"
                        placeholder="Search Antigravity"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <button className="bg-primary hover:bg-primary-hover px-4 flex items-center justify-center cursor-pointer transition-colors">
                        <span className="text-xl text-black">🔍</span>
                    </button>
                </div>

                {/* Right Side Items */}
                <div className="flex items-center gap-1 md:gap-4">

                    {/* Theme Toggle */}
                    <button className="p-2 border border-transparent hover:border-white rounded-sm" onClick={toggleTheme}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    {/* Account & Lists */}
                    <div className="relative group p-2 border border-transparent hover:border-white rounded-sm cursor-pointer leading-tight" onClick={user ? null : onLoginClick}>
                        <span className="block text-xs text-gray-300">Hello, {user ? user.name : 'sign in'}</span>
                        <span className="block text-sm font-bold">Account & Lists</span>

                        {/* Dropdown */}
                        {user && (
                            <div className="absolute right-0 top-full hidden group-hover:block w-48 bg-white text-black shadow-lg rounded-sm mt-1 p-2 border border-gray-200 z-50">
                                <div className="border-b border-gray-200 pb-2 mb-2">
                                    <p className="font-bold text-sm">Your Account</p>
                                </div>
                                <button onClick={onOrdersClick} className="w-full text-left px-2 py-1 hover:bg-gray-100 text-sm">Returns & Orders</button>
                                <button onClick={onLogout} className="w-full text-left px-2 py-1 hover:bg-gray-100 text-sm text-red-600 mt-2">Sign Out</button>
                            </div>
                        )}
                    </div>

                    {/* Orders */}
                    <div className="hidden sm:block p-2 border border-transparent hover:border-white rounded-sm cursor-pointer leading-tight" onClick={onOrdersClick}>
                        <span className="block text-xs text-gray-300">Returns</span>
                        <span className="block text-sm font-bold">& Orders</span>
                    </div>

                    {/* Cart */}
                    <div className="flex items-end p-2 border border-transparent hover:border-white rounded-sm cursor-pointer relative" onClick={onCartClick}>
                        <span className="absolute top-1 left-[22px] font-bold text-primary-hover font-sans">{cartCount}</span>
                        <span className="text-3xl font-bold">🛒</span>
                        <span className="hidden md:inline font-bold text-sm ml-1 mb-1">Cart</span>
                    </div>
                </div>
            </div>

            {/* Sub-nav (optional, for aesthetics) */}
            <div className="bg-amazon-light h-9 flex items-center text-white text-sm px-4 space-x-4 overflow-x-auto">
                <div className="flex items-center gap-1 font-bold cursor-pointer hover:border hover:border-white p-1 rounded-sm">
                    <span>☰</span> All
                </div>
                <p className="cursor-pointer hover:border hover:border-white p-1 rounded-sm">Today's Deals</p>
                <p className="cursor-pointer hover:border hover:border-white p-1 rounded-sm">Customer Service</p>
                <p className="cursor-pointer hover:border hover:border-white p-1 rounded-sm">Registry</p>
                <p className="cursor-pointer hover:border hover:border-white p-1 rounded-sm">Gift Cards</p>
                <p className="cursor-pointer hover:border hover:border-white p-1 rounded-sm">Sell</p>
            </div>
        </nav>
    );
};

export default Navbar;
