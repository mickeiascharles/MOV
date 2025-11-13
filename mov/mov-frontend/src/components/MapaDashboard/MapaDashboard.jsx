import React from "react";
import "./MapaDashboard.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// ... (posição e "fix" do ícone, se você moveu para cá, deixe)

// 1. Receba a prop 'onExpandClick'
function MapaDashboard({ onExpandClick }) {
  return (
    <div className="widget-card mapa-widget-container">
      {/* 2. Adicione o 'onClick' no header do mapa */}
      <div
        className="mapa-header"
        onClick={onExpandClick}
        style={{ cursor: "pointer" }}
      >
        <h3>Mapa de Bueiros Inativos</h3>
        <button>Filtrar zonas em auditoria</button>
      </div>

      <MapContainer
        className="mapa-leaflet-container"
        center={[-15.793889, -47.882778]}
        zoom={11}
        scrollWheelZoom={false}
        // 3. Desativa a interatividade do mapa pequeno
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[-15.793889, -47.882778]}>
          <Popup>
            Poço 112 - Sudoeste <br /> (Clique no cabeçalho para expandir)
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapaDashboard;
