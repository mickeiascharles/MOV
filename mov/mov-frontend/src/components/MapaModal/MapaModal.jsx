import React from "react";
import "./MapaModal.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Posição de Brasília (a mesma de antes)
const position = [-15.793889, -47.882778];

function MapaModal() {
  return (
    <div className="mapa-modal-container">
      {/* O MapContainer agora é maior, baseado no CSS */}
      <MapContainer
        className="mapa-modal-leaflet-container"
        center={position}
        zoom={11}
        scrollWheelZoom={true} // Permitimos scroll no modal
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcadores de exemplo */}
        <Marker position={position}>
          <Popup>Poço 112 - Sudoeste</Popup>
        </Marker>
        <Marker position={[-15.7801, -47.9292]}>
          <Popup>Poço 009 - Asa Sul</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapaModal;
