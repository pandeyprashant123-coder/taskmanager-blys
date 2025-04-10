"use client";
import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalstorage";

type User = {
  username: string;
  email: string;
};

type AuthContextType = {
  token: string;
  login: (newToken: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userData: User;
};

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [token, setToken, clearToken] = useLocalStorage(
    process.env.NEXT_PUBLIC_AUTH_PREFIX!,
    null
  );
  const [user, setUser, clearUser] = useLocalStorage(
    process.env.NEXT_PUBLIC_USER_PREFIX!,
    null
  );

  const login = (newToken: string, user: User) => {
    setToken(newToken);
    setUser(JSON.stringify(user));
  };

  const logout = () => {
    clearToken();
    clearUser();
  };

  const isAuthenticated = token !== null;
  const userData: User = JSON.parse(user);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
