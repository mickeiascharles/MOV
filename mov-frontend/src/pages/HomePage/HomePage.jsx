import React, { useState } from "react";
import "./HomePage.css";
import Alertas from "../../components/Alertas/Alertas";
import TabelaEventos from "../../components/TabelaEventos/TabelaEventos";
import GraficoHistorico from "../../components/GraficoHistorico/GraficoHistorico";
import GraficoLocalizacoes from "../../components/GraficoLocalizacoes/GraficoLocalizacoes";
import MapaDashboard from "../../components/MapaDashboard/MapaDashboard";
import Modal from "../../components/Modal/Modal";
import MapaModal from "../../components/MapaModal/MapaModal";
import AlertaModal from "../../components/AlertaModal/AlertaModal";

function HomePage() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedAlerta, setSelectedAlerta] = useState(null);

  return (
    <div className="homepage-container">
      <div className="widget-historico">
        <GraficoHistorico />
      </div>

      <div className="widget-alertas">
        {/* 3. Passe a função de "abrir" o modal de alerta */}
        <Alertas onAlertaClick={(alerta) => setSelectedAlerta(alerta)} />
      </div>

      <div className="widget-mapa">
        <MapaDashboard onExpandClick={() => setIsMapModalOpen(true)} />
      </div>

      <div className="widget-localizacoes">
        <GraficoLocalizacoes />
      </div>

      <div className="widget-tabela">
        <TabelaEventos />
      </div>

      {/* --- NOSSOS DOIS MODAIS --- */}

      {/* Modal do Mapa (protótipo 4.jpg) */}
      <Modal isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)}>
        <MapaModal />
      </Modal>

      {/* 4. NOVO Modal de Alerta (protótipo 5.jpg) */}
      <Modal isOpen={!!selectedAlerta} onClose={() => setSelectedAlerta(null)}>
        <AlertaModal alerta={selectedAlerta} />
      </Modal>
    </div>
  );
}

export default HomePage;
