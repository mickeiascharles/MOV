import React, { useState, useEffect } from "react";
import "./Alertas.css";
import { getAlertas } from "../../services/api";

// 1. Receba a nova prop 'onAlertaClick'
function Alertas({ onAlertaClick }) {
  const [alertas, setAlertas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarAlertas = async () => {
      setIsLoading(true);
      const response = await getAlertas();
      if (response.ok) {
        setAlertas(response.data);
      }
      setIsLoading(false);
    };

    carregarAlertas();
  }, []);

  if (isLoading) {
    return <div className="alertas-loading">Carregando alertas...</div>;
  }

  return (
    <div className="alertas-container">
      {alertas.map((alerta) => (
        <div
          key={alerta.id}
          className={`alerta-card ${
            alerta.tipo === "nao_autorizada" ? "nao-autorizada" : "autorizada"
          }`}
          // 2. Adicione o 'onClick' aqui
          // 3. Chame a função passando o 'alerta' que foi clicado
          onClick={() => onAlertaClick(alerta)}
        >
          <div className="alerta-header">
            <span>{alerta.codigoBueiro}</span>
            <span>{alerta.horario}</span>
          </div>
          <div className="alerta-body">{alerta.titulo}</div>
        </div>
      ))}
    </div>
  );
}

export default Alertas;
