import React from "react";
import "./DashboardLayout.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom"; // O "buraco" para as páginas

function DashboardLayout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="layout-content">
        {/* É aqui que o Roteador vai renderizar a 
            HomePage, GestaoUsuariosPage, etc. */}
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
