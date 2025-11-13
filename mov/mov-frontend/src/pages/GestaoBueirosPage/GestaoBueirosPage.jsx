import React, { useState, useEffect } from "react";
import "./GestaoBueirosPage.css";

import "../GestaoUsuariosPage/GestaoUsuariosPage.css";

import { getBueiros, cadastrarBueiro } from "../../services/api";

function GestaoBueirosPage() {
  const [bueiros, setBueiros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [codigo, setCodigo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [erroForm, setErroForm] = useState("");

  const carregarBueiros = async () => {
    setIsLoading(true);
    const response = await getBueiros();
    if (response.ok) {
      setBueiros(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    carregarBueiros();
  }, []);

  const handleCadastrar = async (e) => {
    e.preventDefault();
    setErroForm("");

    if (!codigo || !latitude || !longitude) {
      setErroForm("Por favor, preencha todos os campos.");
      return;
    }

    const response = await cadastrarBueiro({
      codigo,
      latitude,
      longitude,
    });

    if (response.ok) {
      alert("Bueiro cadastrado com sucesso!");
      setCodigo("");
      setLatitude("");
      setLongitude("");
      carregarBueiros();
    } else {
      setErroForm("Erro ao cadastrar bueiro.");
    }
  };

  return (
    <div className="gestao-container">
      <h1>Gestão de Bueiros</h1>

      <div className="widget-card form-card">
        <h3>Cadastrar Novo Bueiro</h3>
        <form onSubmit={handleCadastrar} className="form-novo-usuario">
          <div className="form-group" style={{ gridColumn: "1 / 3" }}>
            <label htmlFor="codigo">Código / Localização</label>
            <input
              id="codigo"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ex: Poço 115 - Noroeste"
            />
          </div>

          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Ex: -15.793889"
            />
          </div>
          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Ex: -47.882778"
            />
          </div>

          <button type="submit" className="btn-criar">
            Cadastrar Bueiro
          </button>
          {erroForm && <p className="error-message">{erroForm}</p>}
        </form>
      </div>

      <div className="widget-card lista-card">
        <h3>Bueiros Cadastrados</h3>
        {isLoading ? (
          <p>Carregando bueiros...</p>
        ) : (
          <table className="tabela-usuarios">
            <thead>
              <tr>
                <th>Código / Localização</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bueiros.map((item) => (
                <tr key={item.id}>
                  <td>{item.codigo}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GestaoBueirosPage;
