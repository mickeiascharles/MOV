import React from "react";
import "./Sidebar.css";
import logoMov from "../../assets/mov-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) {
    return null;
  }

  const isSuperAdmin = currentUser.role === "SuperAdmin";
  const isAdmin = currentUser.role === "Admin";
  const isGestorManutencao = currentUser.role === "GestorManutencao";
  const isGestorBueiros = currentUser.role === "GestorBueiros";

  return (
    <div className="sidebar-container">
      <img src={logoMov} alt="MOV Logo" className="sidebar-logo" />

      <nav className="sidebar-nav">
        {/* 5. TROQUE <a> POR <NavLink>
          'end' no primeiro link garante que ele só fique ativo na home ('/')
        */}
        <NavLink to="/" className="nav-link" end>
          Dashboard
        </NavLink>

        <NavLink to="/eventos" className="nav-link">
          Gestão de Eventos
        </NavLink>

        {/* 7. LÓGICA DE PERMISSÃO (Gestão de Manutenções)
          Aparece para Admin, SuperAdmin E GestorManutencao
        */}
        {(isAdmin || isSuperAdmin || isGestorManutencao) && (
          <NavLink to="/gestao-manutencoes" className="nav-link">
            Gestão de Manutenções
          </NavLink>
        )}

        {/* 8. LÓGICA DE PERMISSÃO (Gestão de Bueiros)
          Aparece para Admin, SuperAdmin E GestorBueiros
        */}
        {(isAdmin || isSuperAdmin || isGestorBueiros) && (
          <NavLink to="/gestao-bueiros" className="nav-link">
            Gestão de Bueiros
          </NavLink>
        )}

        {/* 6. LÓGICA DE PERMISSÃO (Gestão de Usuários)
          Só aparece se for Admin OU SuperAdmin
        */}
        {(isAdmin || isSuperAdmin) && (
          <NavLink to="/gestao-usuarios" className="nav-link">
            Gestão de Usuários
          </NavLink>
        )}

        {/* Ajustes aparece para TODOS os usuários logados */}
        <NavLink to="/ajustes" className="nav-link">
          Ajustes
        </NavLink>
      </nav>

      {/* 9. ATUALIZE O FOOTER com nome e botão de Sair */}
      <div className="sidebar-footer">
        <span className="footer-username" title={currentUser.nome}>
          {currentUser.nome}
        </span>
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
