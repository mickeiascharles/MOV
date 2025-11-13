import React, { useState, useEffect } from "react";
import "./GraficoLocalizacoes.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Já foi instalado
import { getGraficoLocalizacoes } from "../../services/api";

// Registra os componentes (necessário para o Chart.js)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GraficoLocalizacoes() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      const response = await getGraficoLocalizacoes();
      if (response.ok) {
        setChartData(response.data);
      }
    };
    carregarDados();
  }, []);

  // Opções de configuração do gráfico (para parecer com o protótipo)
  const options = {
    indexAxis: "y", // <-- ISSO FAZ O GRÁFICO SER VERTICAL (horizontal)
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Esconde a legenda
      },
    },
    scales: {
      x: {
        // Esconde os números do eixo X (de baixo)
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        // Eixo Y (os nomes das localizações)
        grid: { display: false }, // Sem linhas de grade
        border: { display: false }, // Sem a linha do eixo
      },
    },
  };

  if (!chartData) {
    return (
      <div className="widget-card">
        <h3>Localizações com Eventos</h3>Carregando gráfico...
      </div>
    );
  }

  return (
    <div className="widget-card grafico-localizacoes-container">
      <h3>Localizações com Eventos</h3>
      <div className="chart-wrapper-localizacoes">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}

export default GraficoLocalizacoes;
