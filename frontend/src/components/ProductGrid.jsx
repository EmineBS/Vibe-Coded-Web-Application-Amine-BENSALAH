import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart }) => {
    if (products.length === 0) {
        return (
            <div className="p-8 text-center bg-white rounded-md shadow-sm">
                <h3 className="text-xl font-medium text-gray-700">No products found.</h3>
                <p className="text-gray-500">Try adjusting your search or category.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductGrid;
