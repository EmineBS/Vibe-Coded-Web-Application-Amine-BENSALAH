import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-amazon-light text-white mt-8">
            <div className="bg-amazon-hover py-4 text-center cursor-pointer hover:bg-gray-600 transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to top
            </div>

            <div className="max-w-screen-2xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-600">
                <div className="space-y-3">
                    <h3 className="font-bold text-lg mb-2">Get to Know Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:underline cursor-pointer">Careers</li>
                        <li className="hover:underline cursor-pointer">Blog</li>
                        <li className="hover:underline cursor-pointer">About Antigravity</li>
                        <li className="hover:underline cursor-pointer">Sustainability</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h3 className="font-bold text-lg mb-2">Make Money with Us</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:underline cursor-pointer">Sell products on Antigravity</li>
                        <li className="hover:underline cursor-pointer">Sell on Antigravity Business</li>
                        <li className="hover:underline cursor-pointer">Sell apps on Antigravity</li>
                        <li className="hover:underline cursor-pointer">Become an Affiliate</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h3 className="font-bold text-lg mb-2">Amazon Payment Products</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:underline cursor-pointer">Antigravity Business Card</li>
                        <li className="hover:underline cursor-pointer">Shop with Points</li>
                        <li className="hover:underline cursor-pointer">Reload Your Balance</li>
                        <li className="hover:underline cursor-pointer">Antigravity Currency Converter</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h3 className="font-bold text-lg mb-2">Let Us Help You</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:underline cursor-pointer">Antigravity and COVID-19</li>
                        <li className="hover:underline cursor-pointer">Your Account</li>
                        <li className="hover:underline cursor-pointer">Your Orders</li>
                        <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
                    </ul>
                </div>
            </div>

            <div className="bg-amazon-dark py-8 text-center border-t border-gray-600">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <span className="text-2xl font-bold font-sans">Antigravity</span>
                </div>
                <p className="text-xs text-gray-400">
                    © 2026, Antigravity.com, Inc. or its affiliates
                </p>
            </div>
        </footer>
    );
};

export default Footer;
