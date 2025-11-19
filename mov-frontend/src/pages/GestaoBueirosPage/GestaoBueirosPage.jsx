import React, { useState, useEffect } from "react";
import "./GestaoBueirosPage.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { getBueiros, cadastrarBueiro, excluirBueiro } from "../../services/api";
import Modal from "../../components/Modal/Modal";
import BueiroDetalhesModal from "../../components/BueiroDetalhesModal/BueiroDetalhesModal";

function MapBounds({ bueiros }) {
  const map = useMap();

  useEffect(() => {
    if (bueiros.length > 0) {
      const bounds = bueiros.map((b) => [
        parseFloat(b.latitude),
        parseFloat(b.longitude),
      ]);
      if (bounds.length === 1) {
        map.setView(bounds[0], 13);
      } else {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [bueiros, map]);

  return null;
}

function GestaoBueirosPage() {
  const [bueiros, setBueiros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBueiro, setSelectedBueiro] = useState(null);

  // Estados do formulário
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
      setIsModalOpen(false);
      carregarBueiros();
    } else {
      setErroForm("Erro ao cadastrar bueiro.");
    }
  };

  const handleExcluirBueiro = async (bueiroId) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este bueiro? Todos os eventos relacionados também serão excluídos."
      )
    ) {
      const response = await excluirBueiro(bueiroId);
      if (response.ok) {
        alert("Bueiro excluído com sucesso!");
        carregarBueiros();
      } else {
        alert(response.error || "Erro ao excluir bueiro.");
      }
    }
  };

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

  const defaultCenter = [-15.793889, -47.882778];
  const mapCenter =
    bueiros.length > 0
      ? [parseFloat(bueiros[0].latitude), parseFloat(bueiros[0].longitude)]
      : defaultCenter;

  return (
    <div className="gestao-bueiros-page">
      {/* Cabeçalho */}
      <div className="gestao-bueiros-header">
        <div className="header-text">
          <h1>Gestão de Bueiros</h1>
          <p className="header-subtitle">
            Gerencie todos os bueiros monitorados
          </p>
        </div>
        <button
          className="btn-cadastrar-bueiro"
          onClick={() => setIsModalOpen(true)}
        >
          + Cadastrar Bueiro
        </button>
      </div>

      {/* Seção do Mapa */}
      <div className="mapa-section">
        <div className="mapa-header-section">
          <h2>Visualização no Mapa</h2>
          <p className="mapa-subtitle">
            Localização geográfica de todos os bueiros ({bueiros.length} no
            total)
          </p>
        </div>
        <div className="mapa-container-card">
          {isLoading ? (
            <div className="loading-map">Carregando mapa...</div>
          ) : (
            <MapContainer
              center={mapCenter}
              zoom={bueiros.length > 1 ? 11 : 13}
              scrollWheelZoom={true}
              className="bueiros-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {bueiros.map((bueiro) => (
                <Marker
                  key={bueiro.id}
                  position={[
                    parseFloat(bueiro.latitude),
                    parseFloat(bueiro.longitude),
                  ]}
                >
                  <Popup>
                    <strong>{bueiro.codigo}</strong>
                    <br />
                    Status: {getStatusLabel(bueiro.status)}
                    <br />
                    Coordenadas: {bueiro.latitude}, {bueiro.longitude}
                  </Popup>
                </Marker>
              ))}
              <MapBounds bueiros={bueiros} />
            </MapContainer>
          )}
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="bueiros-cards-section">
        <h2>Bueiros Cadastrados</h2>
        {isLoading ? (
          <div className="loading-cards">Carregando bueiros...</div>
        ) : bueiros.length === 0 ? (
          <div className="no-bueiros">Nenhum bueiro cadastrado ainda.</div>
        ) : (
          <div className="bueiros-grid">
            {bueiros.map((bueiro) => (
              <div key={bueiro.id} className="bueiro-card">
                <div className="bueiro-card-header">
                  <h3 className="bueiro-id">{bueiro.codigo}</h3>
                  <span
                    className={`status-badge ${getStatusColor(bueiro.status)}`}
                  >
                    {getStatusLabel(bueiro.status)}
                  </span>
                </div>
                <div className="bueiro-card-body">
                  <div className="bueiro-info-item">
                    <span className="info-label">Endereço:</span>
                    <span className="info-value">
                      {bueiro.endereco || "Não informado"}
                    </span>
                  </div>
                  <div className="bueiro-info-item">
                    <span className="info-label">Coordenadas:</span>
                    <span className="info-value">
                      {parseFloat(bueiro.latitude).toFixed(6)},{" "}
                      {parseFloat(bueiro.longitude).toFixed(6)}
                    </span>
                  </div>
                  <div className="bueiro-info-item">
                    <span className="info-label">Device:</span>
                    <span className="info-value">
                      {bueiro.device ||
                        "ESP32-" + bueiro.id.toString().padStart(6, "0")}
                    </span>
                  </div>
                  <div className="bueiro-info-item">
                    <span className="info-label">Tipo de Cabo:</span>
                    <span className="info-value">
                      {bueiro.tipoCabo || "Fibra Óptica"}
                    </span>
                  </div>
                </div>
                <div className="bueiro-card-footer">
                  <button
                    className="btn-ver-detalhes"
                    onClick={() => setSelectedBueiro(bueiro)}
                  >
                    Ver Detalhes
                  </button>
                  <button
                    className="btn-excluir-card"
                    onClick={() => handleExcluirBueiro(bueiro.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Cadastro */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-cadastro-bueiro">
          <h2>Cadastrar Novo Bueiro</h2>
          <form onSubmit={handleCadastrar} className="form-cadastro-bueiro">
            <div className="form-group">
              <label htmlFor="codigo">Código / Localização</label>
              <input
                id="codigo"
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ex: CX-001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Ex: -23.550500"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Ex: -46.633300"
                required
              />
            </div>

            {erroForm && <p className="error-message">{erroForm}</p>}

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancelar"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal de Detalhes do Bueiro */}
      <Modal
        isOpen={selectedBueiro !== null}
        onClose={() => setSelectedBueiro(null)}
      >
        {selectedBueiro && (
          <BueiroDetalhesModal
            bueiro={selectedBueiro}
            onClose={() => setSelectedBueiro(null)}
          />
        )}
      </Modal>
    </div>
  );
}

export default GestaoBueirosPage;
