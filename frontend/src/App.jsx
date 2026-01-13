import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import OrderHistory from './pages/OrderHistory';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [view, setView] = useState('home'); // home, login, register, orders
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (loading) return <div className="loader">Initializing...</div>;

  // Admin view
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  // Role-based views
  if (view === 'login') {
    return (
      <LoginPage
        onSwitchToRegister={() => setView('register')}
        onSuccess={() => setView('home')}
      />
    );
  }

  if (view === 'register') {
    return (
      <RegisterPage
        onSwitchToLogin={() => setView('login')}
      />
    );
  }

  if (view === 'orders') {
    return (
      <OrderHistory
        onBack={() => setView('home')}
      />
    );
  }

  return (
    <HomePage
      onLoginClick={() => setView('login')}
      onOrdersClick={() => setView('orders')}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
