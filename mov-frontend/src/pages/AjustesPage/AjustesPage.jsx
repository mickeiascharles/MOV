import React, { useState, useEffect, useRef } from "react";
import "./AjustesPage.css";
import "../GestaoUsuariosPage/GestaoUsuariosPage.css";

import {
  getMeuPerfil,
  updateMeuPerfil,
  uploadFotoPerfil,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function AjustesPage() {
  const { currentUser, login } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [erroForm, setErroForm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const carregarPerfil = async () => {
      if (!currentUser) return;

      setIsLoading(true);

      const response = await getMeuPerfil(currentUser.id);

      if (response.ok) {
        setNome(response.data.nome);
        setEmail(response.data.email);
        setContato(response.data.contato || "");
      } else {
        setErroForm("Erro ao carregar seu perfil.");
      }
      setIsLoading(false);
    };

    carregarPerfil();
  }, [currentUser]);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setErroForm("");

    if (!nome || !email) {
      setErroForm("Nome e Email são obrigatórios.");
      return;
    }

    const response = await updateMeuPerfil(currentUser.id, {
      nome,
      email,
      contato,
    });

    if (response.ok) {
      login(response.data);
      alert("Perfil atualizado com sucesso!");
    } else {
      setErroForm(response.error || "Erro ao atualizar perfil.");
    }
  };

  const handleFotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("foto", file);

      const response = await uploadFotoPerfil(currentUser.id, formData);

      if (response.ok) {
        login(response.data);
        alert("Foto atualizada com sucesso!");
      } else {
        alert("Erro ao enviar foto: " + response.error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="gestao-container">
        <h1>Ajustes do Perfil</h1>
        <div className="widget-card form-card">
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gestao-container">
      <h1>Ajustes do Perfil</h1>

      <div className="widget-card form-card">
        <h3>Suas Informações</h3>

        <div className="perfil-foto-wrapper">
          <img
            src={
              currentUser?.foto_url
                ? currentUser.foto_url
                : `https://ui-avatars.com/api/?name=${
                    nome ? nome.replace(" ", "+") : "User"
                  }&background=FF7F00&color=fff&size=128`
            }
            alt="Foto de Perfil"
            className="perfil-foto"
            onError={(e) =>
              (e.target.src = `https://ui-avatars.com/api/?name=${
                nome ? nome.replace(" ", "+") : "User"
              }&background=FF7F00&color=fff&size=128`)
            }
          />
          <button type="button" className="btn-foto" onClick={handleFotoClick}>
            Trocar Foto
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="input-foto-escondido"
            accept="image/png, image/jpeg"
          />
        </div>

        <form onSubmit={handleSalvar} className="form-novo-usuario">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email de Login</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contato">Nº de Contato (opcional)</label>
            <input
              id="contato"
              type="tel"
              value={contato}
              onChange={(e) => setContato(e.target.value || "")}
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Nova Senha (opcional)</label>
            <input
              id="senha"
              type="password"
              placeholder="Deixe em branco para não alterar"
            />
          </div>
          <button type="submit" className="btn-criar">
            Salvar Alterações
          </button>
          {erroForm && <p className="error-message">{erroForm}</p>}
        </form>
      </div>
    </div>
  );
}

export default AjustesPage;
