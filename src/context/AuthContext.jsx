import React, { createContext, useContext, useState } from 'react';
import { getStoredAuth, saveStoredAuth } from '../utils/localStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredAuth());

  const login = (email, password) => {
    // Standard auth login handler
    const formattedName = email.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const userData = {
      name: formattedName || 'System Admin',
      email: email,
      role: email.toLowerCase().includes('admin') ? 'System Administrator' : 'HR Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    };
    setUser(userData);
    saveStoredAuth(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    saveStoredAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
