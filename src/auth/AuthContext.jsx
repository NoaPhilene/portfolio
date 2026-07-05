import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../data/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api
      .me()
      .then((r) => setLoggedIn(!!r.loggedIn))
      .catch(() => setLoggedIn(false))
      .finally(() => setChecking(false));
  }, []);

  const login = useCallback(async (username, password) => {
    await api.login(username, password);
    setLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await api.logout();
    setLoggedIn(false);
  }, []);

  return <AuthContext.Provider value={{ loggedIn, checking, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
