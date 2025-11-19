import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("mov-user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Falha ao ler o localStorage", error);
      return null;
    }
  });

  const login = (userData) => {
    try {
      localStorage.setItem("mov-user", JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error("Falha ao salvar no localStorage", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("mov-user");
      setCurrentUser(null);
    } catch (error) {
      console.error("Falha ao remover do localStorage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
