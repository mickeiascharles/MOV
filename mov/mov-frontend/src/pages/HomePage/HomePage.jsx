import React, { useState } from "react";
import "./HomePage.css";

// Imports dos widgets
import Alertas from "../../components/Alertas/Alertas";
import TabelaEventos from "../../components/TabelaEventos/TabelaEventos";
import GraficoHistorico from "../../components/GraficoHistorico/GraficoHistorico";
import GraficoLocalizacoes from "../../components/GraficoLocalizacoes/GraficoLocalizacoes";
import MapaDashboard from "../../components/MapaDashboard/MapaDashboard";

// Imports dos Modais
import Modal from "../../components/Modal/Modal";
import MapaModal from "../../components/MapaModal/MapaModal";
// 1. IMPORTE o novo conteúdo do modal de alerta
import AlertaModal from "../../components/AlertaModal/AlertaModal";

function HomePage() {
  // "Interruptor" para o modal do MAPA (que já fizemos)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // 2. NOVO "Interruptor" para o modal de ALERTA
  // Vai guardar o alerta SELECIONADO (ou 'null' se estiver fechado)
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
      <Modal
        isOpen={!!selectedAlerta} // '!!' transforma o objeto em boolean (true/false)
        onClose={() => setSelectedAlerta(null)}
      >
        <AlertaModal alerta={selectedAlerta} />
      </Modal>
    </div>
  );
}

export default HomePage;
