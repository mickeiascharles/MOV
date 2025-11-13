import React, { useState, useEffect } from "react";
import "./GestaoManutencoesPage.css";

import "../GestaoUsuariosPage/GestaoUsuariosPage.css";
import { getManutencoes, agendarManutencao } from "../../services/api";

function GestaoManutencoesPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [codigoBueiro, setCodigoBueiro] = useState("");
  const [dataAgendada, setDataAgendada] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [erroForm, setErroForm] = useState("");

  const carregarAgendamentos = async () => {
    setIsLoading(true);
    const response = await getManutencoes();
    if (response.ok) {
      setAgendamentos(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const handleAgendar = async (e) => {
    e.preventDefault();
    setErroForm("");

    if (
      !codigoBueiro ||
      !dataAgendada ||
      !horarioInicio ||
      !horarioFim ||
      !responsavel
    ) {
      setErroForm("Por favor, preencha todos os campos.");
      return;
    }

    const response = await agendarManutencao({
      codigoBueiro,
      dataAgendada,
      horarioInicio,
      horarioFim,
      responsavel,
    });

    if (response.ok) {
      alert("Manutenção agendada com sucesso!");

      setCodigoBueiro("");
      setDataAgendada("");
      setHorarioInicio("");
      setHorarioFim("");
      setResponsavel("");
      carregarAgendamentos();
    } else {
      setErroForm("Erro ao agendar manutenção.");
    }
  };

  return (
    <div className="gestao-container">
      <h1>Gestão de Manutenções</h1>

      {}
      <div className="widget-card form-card">
        <h3>Agendar Nova Manutenção</h3>
        <form onSubmit={handleAgendar} className="form-novo-usuario">
          {" "}
          {}
          <div className="form-group">
            <label htmlFor="codigoBueiro">Código do Bueiro</label>
            <input
              id="codigoBueiro"
              type="text"
              value={codigoBueiro}
              onChange={(e) => setCodigoBueiro(e.target.value)}
              placeholder="Ex: Poço 003 - Bloco B"
            />
          </div>
          <div className="form-group">
            <label htmlFor="responsavel">Equipe Responsável</label>
            <input
              id="responsavel"
              type="text"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Ex: Equipe Alpha"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataAgendada">Data</label>
            <input
              id="dataAgendada"
              type="date"
              value={dataAgendada}
              onChange={(e) => setDataAgendada(e.target.value)}
            />
          </div>
          <div className="form-group-inline">
            {" "}
            {}
            <div className="form-group">
              <label htmlFor="horarioInicio">Início</label>
              <input
                id="horarioInicio"
                type="time"
                value={horarioInicio}
                onChange={(e) => setHorarioInicio(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="horarioFim">Fim</label>
              <input
                id="horarioFim"
                type="time"
                value={horarioFim}
                onChange={(e) => setHorarioFim(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-criar">
            Agendar Manutenção
          </button>
          {erroForm && <p className="error-message">{erroForm}</p>}
        </form>
      </div>

      {}
      <div className="widget-card lista-card">
        <h3>Agendamentos Futuros</h3>
        {isLoading ? (
          <p>Carregando agendamentos...</p>
        ) : (
          <table className="tabela-usuarios">
            {" "}
            {}
            <thead>
              <tr>
                <th>Bueiro</th>
                <th>Responsável</th>
                <th>Data</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((item) => (
                <tr key={item.id}>
                  <td>{item.codigoBueiro}</td>
                  <td>{item.responsavel}</td>
                  <td>
                    {new Date(item.dataAgendada).toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td>
                    {item.horarioInicio} - {item.horarioFim}
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

export default GestaoManutencoesPage;
