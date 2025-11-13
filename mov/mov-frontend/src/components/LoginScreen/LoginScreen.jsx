import React, { useState } from "react";
import "./LoginScreen.css"; // Note que o import do CSS vem ANTES do resto
import logoMov from "../../assets/mov-logo.png";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiLogin } from "../../services/api";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const response = await apiLogin(email, senha);
    setIsLoading(false);

    if (response.ok) {
      login(response.data);
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    // 1. ADICIONAMOS ESTE WRAPPER DE CENTRALIZAÇÃO
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="map-placeholder">
          <img src={logoMov} alt="MOV Logo" className="map-logo-overlay" />
        </div>

        <div className="login-card">
          <img src={logoMov} alt="MOV Logo" className="mov-logo" />

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Login"}
            </button>
          </form>

          {/* 2. ADICIONAMOS UMA CLASSE ao erro */}
          {error && <p className="login-error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
