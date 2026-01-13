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
        <div className="auth-page">
            <div className="auth-card glass">
                <h2>Create Account</h2>
                {error && <div className="error-badge">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-btn">Register</button>
                </form>
                <p className="switch-text">
                    Already have an account? <button onClick={onSwitchToLogin}>Login</button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
