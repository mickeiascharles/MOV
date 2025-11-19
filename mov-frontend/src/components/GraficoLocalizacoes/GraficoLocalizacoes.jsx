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
} from "chart.js";
import { getGraficoLocalizacoes } from "../../services/api";

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

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        border: { display: false },
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
