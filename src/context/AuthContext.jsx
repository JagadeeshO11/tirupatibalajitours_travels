import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [credentials, setCredentials] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_credentials');
      return saved ? JSON.parse(saved) : DEFAULT_CREDENTIALS;
    } catch {
      return DEFAULT_CREDENTIALS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('admin_credentials', JSON.stringify(credentials));
    } catch (e) {
      console.error('Failed to save admin credentials to localStorage', e);
    }
  }, [credentials]);

  const login = (username, password) => {
    if (username.trim() === credentials.username && password === credentials.password) {
      const userObj = { username, role: 'Administrator', loginTime: new Date().toISOString() };
      setUser(userObj);
      localStorage.setItem('admin_user', JSON.stringify(userObj));
      localStorage.setItem('admin_token', 'token_' + Date.now());
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
  };

  const updateCredentials = (newUsername, newPassword) => {
    const updated = { username: newUsername, password: newPassword };
    setCredentials(updated);
    if (user) {
      setUser(prev => ({ ...prev, username: newUsername }));
      localStorage.setItem('admin_user', JSON.stringify({ ...user, username: newUsername }));
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated: Boolean(user),
      user,
      login,
      logout,
      credentials,
      updateCredentials
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
