import React, { useState, useEffect } from "react";
import "./MapaModal.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getBueiros } from "../../services/api";

function MapaModal() {
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
    <div className="mapa-modal-container">
      <MapContainer
        className="mapa-modal-leaflet-container"
        center={centroMapa}
        zoom={12}
        scrollWheelZoom={true}
        key={centroMapa.toString()}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Renderiza os marcadores reais */}
        {bueiros.map((bueiro) => (
          <Marker
            key={bueiro.id}
            position={[
              parseFloat(bueiro.latitude),
              parseFloat(bueiro.longitude),
            ]}
          >
            <Popup>
              <strong>{bueiro.codigo}</strong> <br />
              Status: {bueiro.status} <br />
              Coord: {bueiro.latitude}, {bueiro.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapaModal;
