import React from "react";
import "./LoginScreen.css";

import logoMov from "../../assets/mov-logo.png";

function LoginScreen() {
  return (
    <div className="login-container">
      {}
      <div className="map-placeholder">
        {}

        {}
        <img src={logoMov} alt="MOV Logo" className="map-logo-overlay" />
      </div>

      {}
      <div className="login-card">
        <img src={logoMov} alt="MOV Logo" className="mov-logo" />
        <h2>Login</h2> {}
        <form>
          <input type="email" placeholder="email" /> {}
          <input type="password" placeholder="senha" />
          <button type="submit">Login</button> {}
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
