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
        <div className="auth-page">
            <div className="auth-card glass">
                <h2>Welcome Back</h2>
                {error && <div className="error-badge">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-btn">Sign In</button>
                </form>
                <p className="switch-text">
                    Don't have an account? <button onClick={onSwitchToRegister}>Register</button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
