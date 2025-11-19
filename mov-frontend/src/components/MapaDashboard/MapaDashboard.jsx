import React, { useState, useEffect } from "react";
import "./MapaDashboard.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getBueiros } from "../../services/api";

function MapaDashboard({ onExpandClick }) {
  const [bueiros, setBueiros] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const response = await getBueiros();
      if (response.ok) {
        setBueiros(response.data);
      }
    };
    carregarDados();
  }, []);

  const centroMapa =
    bueiros.length > 0
      ? [parseFloat(bueiros[0].latitude), parseFloat(bueiros[0].longitude)]
      : [-15.793889, -47.882778];

  return (
    <div className="widget-card mapa-widget-container">
      <div
        className="mapa-header"
        onClick={onExpandClick}
        style={{ cursor: "pointer" }}
      >
        {/* Mantivemos o texto e botões originais */}
        <h3>Mapa de Bueiros Inativos</h3>
        <button>Filtrar zonas em auditoria</button>
      </div>

      <MapContainer
        className="mapa-leaflet-container"
        center={centroMapa}
        zoom={11}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        key={centroMapa.toString()}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 3. Mapeamos os bueiros reais aqui */}
        {bueiros.map((bueiro) => (
          <Marker
            key={bueiro.id}
            position={[
              parseFloat(bueiro.latitude),
              parseFloat(bueiro.longitude),
            ]}
          >
            {/* Popup simples ao clicar no marcador */}
            <Popup>
              <strong>{bueiro.codigo}</strong> <br />
              Status: {bueiro.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapaDashboard;
