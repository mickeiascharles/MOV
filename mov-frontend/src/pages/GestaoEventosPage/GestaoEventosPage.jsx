import React, { useState, useEffect } from "react";
import "./GestaoEventosPage.css";
import { getAllEventos } from "../../services/api";

function GestaoEventosPage() {
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroPrioridade, setFiltroPrioridade] = useState("todas");
  const [filtroBusca, setFiltroBusca] = useState("");

  const carregarEventos = async () => {
    setIsLoading(true);
    const response = await getAllEventos();
    if (response.ok) {
      setEventos(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  const normalizeString = (str) => {
    return (
      str
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") || ""
    );
  };

  const eventosFiltrados = eventos.filter((evento) => {
    const matchStatus =
      filtroStatus === "todos" ||
      normalizeString(evento.statusAtendimento) ===
        normalizeString(filtroStatus);

    const matchPrioridade =
      filtroPrioridade === "todas" ||
      normalizeString(evento.prioridade) === normalizeString(filtroPrioridade);

    const matchBusca =
      filtroBusca === "" ||
      normalizeString(evento.local).includes(normalizeString(filtroBusca)) ||
      normalizeString(evento.descricao).includes(normalizeString(filtroBusca));

    return matchStatus && matchPrioridade && matchBusca;
  });

  const getBarraColor = (prioridade, statusAtendimento) => {
    if (statusAtendimento === "Fechado") return "#E0E0E0";
    if (prioridade === "Alta") return "#D32F2F";
    if (prioridade === "Média") return "#FF7F00";
    return "#E0E0E0";
  };

  const getPrioridadeColor = (prioridade) => {
    if (prioridade === "Alta") return "chip-alta";
    if (prioridade === "Média") return "chip-media";
    return "chip-baixa";
  };

  const getStatusColor = (statusAtendimento) => {
    if (statusAtendimento === "Aberto") return "chip-aberto";
    if (statusAtendimento === "Em Atendimento") return "chip-atendimento";
    return "chip-fechado";
  };

  return (
    <div className="gestao-eventos-container">
      {/* Header */}
      <div className="eventos-header">
        <div className="header-content">
          <div className="header-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L1 21H23L12 2Z"
                fill="#FF7F00"
                stroke="#FF7F00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 9V13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 17H12.01"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="header-text">
            <h1>Gestão de Eventos e Alertas</h1>
            <p>Monitore e gerencie todos os eventos de violação detectados</p>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="filtros-section">
        <div className="search-container">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="#666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por localização..."
            value={filtroBusca}
            onChange={(e) => setFiltroBusca(e.target.value)}
          />
        </div>

        <div className="filtros-dropdowns">
          <select
            className="filtro-select"
            value={filtroPrioridade}
            onChange={(e) => setFiltroPrioridade(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>

          <select
            className="filtro-select"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="aberto">Aberto</option>
            <option value="em atendimento">Em Atendimento</option>
            <option value="fechado">Fechado</option>
          </select>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="eventos-list">
        {isLoading ? (
          <div className="loading-message">Carregando eventos...</div>
        ) : eventosFiltrados.length === 0 ? (
          <div className="empty-message">Nenhum evento encontrado.</div>
        ) : (
          eventosFiltrados.map((evento) => (
            <div
              key={evento.id}
              className="evento-card"
              style={{
                borderLeftColor: getBarraColor(
                  evento.prioridade,
                  evento.statusAtendimento
                ),
              }}
            >
              <div className="evento-content">
                <div className="evento-info">
                  <div className="evento-localizacao">
                    <svg
                      className="icon-pin"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C4.13401 0 1 3.13401 1 7C1 12 8 16 8 16C8 16 15 12 15 7C15 3.13401 11.866 0 8 0Z"
                        fill="#666"
                      />
                      <circle cx="8" cy="7" r="3" fill="white" />
                    </svg>
                    <span className="local-text">{evento.local}</span>
                  </div>

                  <div className="evento-coordenadas">
                    {evento.latitude && evento.longitude
                      ? `${evento.latitude}, ${evento.longitude}`
                      : "Coordenadas não disponíveis"}
                  </div>

                  <div className="evento-descricao">{evento.descricao}</div>

                  <div className="evento-timestamp">
                    <svg
                      className="icon-clock"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#666"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 4V8L10 10"
                        stroke="#666"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{evento.dataFormatada || evento.data}</span>
                  </div>
                </div>

                <div className="evento-chips">
                  <span
                    className={`chip ${getPrioridadeColor(evento.prioridade)}`}
                  >
                    {evento.prioridade}
                  </span>
                  <span
                    className={`chip ${getStatusColor(
                      evento.statusAtendimento
                    )}`}
                  >
                    {evento.statusAtendimento}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GestaoEventosPage;
