import React, { useState, useEffect } from "react";
import "./GraficoHistorico.css";
import { Bar } from "react-chartjs-2"; // Importa o componente de Barras
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getHistoricoEventos } from "../../services/api";

// ETAPA ESSENCIAL: O Chart.js precisa que você "registre"
// os componentes que ele vai usar.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoHistorico() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      const response = await getHistoricoEventos();
      if (response.ok) {
        setChartData(response.data);
      }
    };
    carregarDados();
  }, []);

  // Opções de configuração do gráfico (para parecer com o protótipo)
  const options = {
    responsive: true, // Faz o gráfico se adaptar ao container
    maintainAspectRatio: false, // Permite que ele se estique
    plugins: {
      legend: {
        display: false, // Esconde a legenda (Autorizados/Não Autorizados)
      },
      title: {
        display: false, // Esconde o título
      },
    },
    scales: {
      x: {
        stacked: true, // Empilha as barras (laranja e vermelho)
        grid: {
          display: false, // Esconde as linhas de grade do eixo X
        },
      },
      y: {
        stacked: true, // Empilha as barras
        grid: {
          color: "#f0f0f0", // Linhas de grade do eixo Y mais fracas
          borderColor: "transparent",
        },
      },
    },
  };

  if (!chartData) {
    return (
      <div className="widget-card">
        <h3>Histórico de Eventos</h3>Carregando gráfico...
      </div>
    );
  }

  return (
    <div className="widget-card grafico-historico-container">
      <h3>Histórico de Eventos</h3>
      {/* O container precisa de uma altura definida para o gráfico renderizar */}
      <div className="chart-wrapper">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}

export default GraficoHistorico;
