import React, { createContext, useState, useContext } from "react";

// 1. Cria o Contexto (igual)
const AuthContext = createContext(null);

// 2. Cria o Provedor
const AuthProvider = ({ children }) => {
  // 3. MUDANÇA IMPORTANTE: Inicializar o estado lendo do localStorage
  // Agora, quando o app carregar, ele verifica se alguém já estava logado.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("mov-user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Falha ao ler o localStorage", error);
      return null;
    }
  });

  // 4. MUDANÇA IMPORTANTE: Função de login agora SALVA no localStorage
  const login = (userData) => {
    try {
      // Salva o usuário como string no localStorage
      localStorage.setItem("mov-user", JSON.stringify(userData));
      // E também atualiza o estado atual
      setCurrentUser(userData);
    } catch (error) {
      console.error("Falha ao salvar no localStorage", error);
    }
  };

  // 5. MUDANÇA IMPORTANTE: Função de logout agora LIMPA o localStorage
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

// 6. Hook (com o fix do lint que fizemos)
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// 7. Exporta o Provedor como PADRÃO (igual)
export default AuthProvider;
