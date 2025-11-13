import React, { useEffect } from "react";
import "./AlertaModal.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Posição de Brasília (centro)
const centroBrasilia = [-15.793889, -47.882778];

// Posições FALSAS para nossos alertas mockados
const localizacoesMock = {
  "BR-040 | Km 312": [-15.835, -47.926],
  "DF-001 | Km 02": [-15.78, -47.91],
};

// Componente auxiliar para centralizar o mapa
const MapFocus = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15);
    }
  }, [position, map]);
  return null;
};

function AlertaModal({ alerta }) {
  if (!alerta) return null;

  const position = localizacoesMock[alerta.codigoBueiro] || centroBrasilia;

  // 1. ESTA É A MUDANÇA: Define a classe CSS com base no tipo de alerta
  const tipoClasse =
    alerta.tipo === "nao_autorizada"
      ? "tipo-nao-autorizada"
      : "tipo-autorizada";

  return (
    // 2. APLIQUE a classe dinâmica aqui
    <div className={`alerta-modal-container ${tipoClasse}`}>
      {/* 1. O Mapa (esquerda) */}
      <div className="alerta-mapa-wrapper">
        <MapContainer
          className="alerta-mapa-leaflet"
          center={position}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{alerta.titulo}</Popup>
          </Marker>
          <MapFocus position={position} />
        </MapContainer>
      </div>

      {/* 2. O Painel de Detalhes (direita) */}
      <div className="alerta-detalhes-wrapper">
        {/* O h3 agora será estilizado pelo CSS dinâmico */}
        <h3>Detalhes do Alerta</h3>
        <p>
          <strong>Status:</strong> {alerta.titulo}
        </p>
        <p>
          <strong>Horário:</strong> {alerta.horario}
        </p>
        <p>
          <strong>Local:</strong> {alerta.codigoBueiro}
        </p>
        <hr />
        <p>
          <strong>Ação Recomendada:</strong>
        </p>
        {alerta.tipo === "nao_autorizada" ? (
          <p>Enviar equipe de segurança imediatamente.</p>
        ) : (
          <p>Nenhuma ação. Manutenção agendada em andamento.</p>
        )}
      </div>
    </div>
  );
}

export default AlertaModal;
