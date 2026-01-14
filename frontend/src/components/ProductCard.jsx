import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    // Mock rating and delivery info (stable for demo)
    const rating = 4.5;
    const reviews = 1200;

    return (
        <div className="bg-white border border-gray-200 rounded-md p-4 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            {/* Image Container */}
            <div className="bg-gray-100 aspect-square rounded-sm mb-4 flex items-center justify-center overflow-hidden relative p-4">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-contain w-full h-full mix-blend-multiply hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-gray-400 font-bold text-4xl select-none">IMAGE</span>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-base font-medium line-clamp-3 mb-1 hover:text-orange-700 cursor-pointer text-black leading-snug">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1 text-sm">
                    <span className="text-secondary font-bold">★★★★☆</span>
                    <span className="text-link hover:underline cursor-pointer">{reviews}</span>
                </div>

                {/* Price */}
                <div className="flex items-start font-medium text-black mb-1">
                    <span className="text-xs relative top-1 font-normal">$</span>
                    <span className="text-2xl leading-none">{Math.floor(product.price)}</span>
                    <span className="text-xs relative top-0.5">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>

                {/* Delivery */}
                <div className="text-xs text-black mb-2">
                    FREE delivery <span className="font-bold text-black">Tomorrow</span>
                </div>

                {/* Prime Tag */}
                <div className="mb-4">
                    <span className="text-xs font-bold text-[#00a8e1]">✓prime</span>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="mt-auto">
                    <button
                        className="w-full bg-primary hover:bg-primary-hover border border-yellow-500 rounded-full py-1.5 text-sm my-1 cursor-pointer transition-colors shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        onClick={() => onAddToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
