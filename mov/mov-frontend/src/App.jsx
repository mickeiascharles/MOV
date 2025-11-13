import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage/HomePage";
import GestaoUsuariosPage from "./pages/GestaoUsuariosPage/GestaoUsuariosPage";
import GestaoManutencoesPage from "./pages/GestaoManutencoesPage/GestaoManutencoesPage";
import GestaoBueirosPage from "./pages/GestaoBueirosPage/GestaoBueirosPage";

import AjustesPage from "./pages/AjustesPage/AjustesPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="gestao-usuarios"
            element={
              <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
                <GestaoUsuariosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="gestao-manutencoes"
            element={
              <ProtectedRoute
                allowedRoles={["Admin", "SuperAdmin", "GestorManutencao"]}
              >
                <GestaoManutencoesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="gestao-bueiros"
            element={
              <ProtectedRoute
                allowedRoles={["Admin", "SuperAdmin", "GestorBueiros"]}
              >
                <GestaoBueirosPage />
              </ProtectedRoute>
            }
          />

          {}
          <Route path="ajustes" element={<AjustesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
