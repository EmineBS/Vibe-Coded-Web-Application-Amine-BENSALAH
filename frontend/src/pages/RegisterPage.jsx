import React, { useState } from 'react';

const RegisterPage = ({ onSwitchToLogin, onSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const result = await res.json();
            if (result.status === 'success') {
                alert('Registration successful! Please login.');
                onSwitchToLogin();
            } else {
                setError(result.message || 'Registration failed');
            }
        } catch (err) {
            setError('Connection error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-normal mb-6 text-gray-900">Create account</h2>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm mb-4 flex items-center gap-2">⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-bold text-gray-700">Your name</label>
                        <input
                            type="text"
                            placeholder="First and last name"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none transition-shadow"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            placeholder="At least 6 characters"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none transition-shadow"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <p className="text-xs text-gray-500">
                            Passwords must be at least 6 characters.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover border border-yellow-500 rounded-md py-2 text-sm text-black shadow-sm transition-colors cursor-pointer"
                    >
                        Continue
                    </button>
                </form>

                <div className="mt-6 text-sm text-gray-600">
                    <p>
                        Already have an account?{' '}
                        <button onClick={onSwitchToLogin} className="text-link hover:text-red-700 hover:underline cursor-pointer">
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
