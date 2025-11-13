import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// 1. Receba { children } além de { allowedRoles }
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Não está logado? Vai para /login
    return <Navigate to="/login" replace />;
  }

  // Verifica as permissões (allowedRoles)
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Está logado, mas não tem permissão? Vai para a Home ("/")
    return <Navigate to="/" replace />;
  }

  // 2. A MÁGICA ESTÁ AQUI:
  // Se esta rota foi chamada como <ProtectedRoute><Filho /></ProtectedRoute>
  // 'children' existirá. Renderize-o.
  //
  // Se foi chamada como <Route element={<ProtectedRoute />} />
  // 'children' será undefined. Renderize o <Outlet /> para as rotas filhas.
  return children ? children : <Outlet />;
};
