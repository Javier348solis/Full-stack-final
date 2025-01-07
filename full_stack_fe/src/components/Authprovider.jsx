import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de autenticacion
const AuthContext = createContext();

// Componente que provee el contexto de autenticacion a los hijos
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para autenticar si el usuario esta logueado

  // Simula el inicio de sesion, cambiando el estado a autentificado
  const login = () => {
    setIsAuthenticated(true);      
    localStorage.setItem("login", isAuthenticated); // Guardar el estado de inicio de sesion en el localStorage
  };

  // Simula el cierre de sesion, cambiando el estado a no autentificado
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("login"); // Eliminar el item de login del localStorage
  };

  // Proveer el contexto de autenticacion a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto de autenticacion en cualquier componente
export const useAuth = () => useContext(AuthContext);
