import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticación

  // Simula el inicio de sesión
  const login = () => {
    console.log("dad|dsa")
    setIsAuthenticated(true);
  };

  // Simula el cierre de sesión
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
