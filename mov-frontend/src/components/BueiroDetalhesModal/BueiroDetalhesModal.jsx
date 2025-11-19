import React, { useState, useEffect } from "react";
import "./BueiroDetalhesModal.css";
import { getAllEventos } from "../../services/api";

function BueiroDetalhesModal({ bueiro, onClose }) {
  const [eventos, setEventos] = useState([]);
  const [isLoadingEventos, setIsLoadingEventos] = useState(true);

  useEffect(() => {
    const carregarEventos = async () => {
      setIsLoadingEventos(true);
      const response = await getAllEventos();
      if (response.ok) {
        const eventosBueiro = response.data.filter(
          (evento) => evento.local === bueiro.codigo
        );
        setEventos(eventosBueiro);
      }
      setIsLoadingEventos(false);
    };

    if (bueiro) {
      carregarEventos();
    }
  }, [bueiro]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "ativo":
        return "status-ativo";
      case "atenção":
      case "atencao":
        return "status-atencao";
      case "offline":
      case "inativo":
        return "status-offline";
      default:
        return "status-ativo";
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case "ativo":
        return "Ativo";
      case "atenção":
      case "atencao":
        return "Atenção";
      case "offline":
      case "inativo":
        return "Offline";
      default:
        return "Ativo";
    }
  };

  const calcularDiasAtualizacao = () => {
    if (eventos.length > 0) {
      const ultimoEvento = eventos[0];
      if (ultimoEvento.timestampRaw) {
        const dataEvento = new Date(ultimoEvento.timestampRaw);
        const hoje = new Date();
        const diffTime = Math.abs(hoje - dataEvento);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      }
    }
    return 7;
  };

  const diasAtualizacao = calcularDiasAtualizacao();

  const formatarDataInstalacao = () => {
    if (bueiro.dataCriacao) {
      const data = new Date(bueiro.dataCriacao);
      return data.toLocaleDateString("pt-BR");
    }
    return "14/01/2023";
  };

  const device =
    bueiro.device || `ESP32-${bueiro.id.toString().padStart(6, "0")}`;
  const tipoCabo = bueiro.tipoCabo || "Fibra Óptica";
  const endereco = bueiro.endereco || "Não informado";

  return (
    <div className="bueiro-detalhes-modal">
      {/* Header do Modal */}
      <div className="bueiro-detalhes-header">
        <div className="header-left">
          <h1 className="bueiro-codigo">{bueiro.codigo}</h1>
          <p className="bueiro-endereco">{endereco}</p>
        </div>
        <button className="btn-close-modal" onClick={onClose}>
          ×
        </button>
      </div>

      {/* Card: Status Atual */}
      <div className="detalhes-card status-card">
        <h2 className="card-title">Status Atual</h2>
        <div className="status-card-content">
          <div className="status-badge-container">
            <span
              className={`status-badge-large ${getStatusColor(bueiro.status)}`}
            >
              <svg
                className="status-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9L2 10L5 7L8 10L13 5L14 6L8 12L5 9L2 12L1 11L5 7L1 9Z"
                  fill="currentColor"
                />
                <path
                  d="M20 2H18V4H20V6H18V8H20V10H18V12H20V14H18V16H20V18H18V20H20V22H4V20H6V18H4V16H6V14H4V12H6V10H4V8H6V6H4V4H6V2H4V0H20V2Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              {getStatusLabel(bueiro.status)}
            </span>
          </div>
          <div className="status-update-info">
            Atualizado há {diasAtualizacao}{" "}
            {diasAtualizacao === 1 ? "dia" : "dias"}
          </div>
        </div>
      </div>

      {/* Card: Informações Técnicas */}
      <div className="detalhes-card info-card">
        <h2 className="card-title">Informações Técnicas</h2>
        <div className="info-card-content">
          <div className="info-column">
            <div className="info-row">
              <span className="info-label">Dispositivo</span>
              <span className="info-value">{device}</span>
            </div>
            <div className="info-row">
              <span className="info-label">
                <svg
                  className="info-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                    fill="currentColor"
                  />
                </svg>
                {parseFloat(bueiro.latitude).toFixed(6)},{" "}
                {parseFloat(bueiro.longitude).toFixed(6)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">
                <svg
                  className="info-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 4H5C3.89 4 3 4.9 3 6V20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM19 7H5V6H19V7Z"
                    fill="currentColor"
                  />
                </svg>
                Instalado em {formatarDataInstalacao()}
              </span>
            </div>
          </div>
          <div className="info-column">
            <div className="info-row">
              <span className="info-label">Tipo de Cabo</span>
              <span className="info-value">{tipoCabo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card: Histórico de Eventos */}
      <div className="detalhes-card eventos-card">
        <h2 className="card-title">
          <svg
            className="card-title-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
              fill="currentColor"
            />
          </svg>
          Histórico de Eventos ({eventos.length})
        </h2>
        {isLoadingEventos ? (
          <div className="eventos-loading">Carregando eventos...</div>
        ) : eventos.length === 0 ? (
          <div className="eventos-empty">
            <svg
              className="empty-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
              />
            </svg>
            Nenhum evento registrado
          </div>
        ) : (
          <div className="eventos-list">
            {eventos.map((evento) => (
              <div key={evento.id} className="evento-item">
                <div className="evento-info">
                  <span className="evento-tipo">{evento.categoria}</span>
                  <span className="evento-data">{evento.data}</span>
                </div>
                <span className={`evento-status ${evento.statusType}`}>
                  {evento.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BueiroDetalhesModal;
