import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = ({ onSwitchToRegister, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const result = await res.json();
            if (result.status === 'success') {
                login(result.data.user, result.data.accessToken);
                onSuccess?.();
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('Connection error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-normal mb-6 text-gray-900">Sign in</h2>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm mb-4 flex items-center gap-2">⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none transition-shadow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none transition-shadow"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover border border-yellow-500 rounded-md py-2 text-sm text-black shadow-sm transition-colors cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-sm text-gray-600 relative text-center">
                    <span className="relative z-10 bg-white px-2">New to Antigravity?</span>
                    <div className="absolute top-1/2 left-0 w-full border-t border-gray-200 -z-0"></div>
                </div>

                <button
                    onClick={onSwitchToRegister}
                    className="w-full mt-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md py-2 text-sm text-black shadow-sm transition-colors cursor-pointer"
                >
                    Create your Amazon account
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
