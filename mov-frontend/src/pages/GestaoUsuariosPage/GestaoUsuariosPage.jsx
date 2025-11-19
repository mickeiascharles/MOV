import React, { useState, useEffect } from "react";
import "./GestaoUsuariosPage.css";
import { getUsuarios, criarUsuario, excluirUsuario } from "../../services/api";

function GestaoUsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("GestorBueiros");
  const [erroForm, setErroForm] = useState("");
  const carregarUsuarios = async () => {
    setIsLoading(true);
    const response = await getUsuarios();
    if (response.ok) {
      setUsuarios(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleCriarUsuario = async (e) => {
    e.preventDefault();
    setErroForm("");

    if (!nome || !email || !senha || !role) {
      setErroForm("Por favor, preencha todos os campos.");
      return;
    }

    const response = await criarUsuario({ nome, email, senha, role });
    if (response.ok) {
      alert("Usuário criado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      setRole("GestorBueiros");
      carregarUsuarios();
    } else {
      setErroForm("Erro ao criar usuário.");
    }
  };

  const handleExcluirUsuario = async (usuarioId) => {
    // Confirmação simples
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await excluirUsuario(usuarioId);
      alert("Usuário excluído!");
      carregarUsuarios();
    }
  };

  return (
    <div className="gestao-container">
      <h1>Gestão de Usuários</h1>

      {/* --- Formulário de Criação --- */}
      <div className="widget-card form-card">
        <h3>Criar Novo Usuário</h3>
        <form onSubmit={handleCriarUsuario} className="form-novo-usuario">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Ana Silva"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email de Login</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: ana.silva@mov.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha Provisória</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Tipo de Permissão</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="GestorBueiros">Gestor de Bueiros</option>
              <option value="GestorManutencao">Gestor de Manutenção</option>
              <option value="Admin">Admin</option>
              {/* SuperAdmin só pode ser criado por outro SuperAdmin (lógica futura) */}
            </select>
          </div>
          <button type="submit" className="btn-criar">
            Criar Usuário
          </button>
          {erroForm && <p className="error-message">{erroForm}</p>}
        </form>
      </div>

      {/* --- Lista de Usuários --- */}
      <div className="widget-card lista-card">
        <h3>Usuários Atuais</h3>
        {isLoading ? (
          <p>Carregando usuários...</p>
        ) : (
          <table className="tabela-usuarios">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Permissão (Role)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn-excluir"
                      onClick={() => handleExcluirUsuario(user.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GestaoUsuariosPage;
