import React, { useState, useEffect } from "react";
import "./GraficoHistorico.css";
import { Bar } from "react-chartjs-2";
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#f0f0f0",
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
