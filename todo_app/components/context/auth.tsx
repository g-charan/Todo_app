"use client";

import { User, getUser, isAuthenticated, logout } from "@/services/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  loading: true,
  logout: () => {},
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      if (loggedIn) {
        const userData = getUser();
        setUser(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const handleSetUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        logout: handleLogout,
        setUser: handleSetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
