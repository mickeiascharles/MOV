import React, { useState, useEffect } from "react";
import "./TabelaEventos.css";
import { getTabelaEventos } from "../../services/api";

function TabelaEventos() {
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarEventos = async () => {
      setIsLoading(true);
      const response = await getTabelaEventos();
      if (response.ok) {
        setEventos(response.data);
      }
      setIsLoading(false);
    };

    carregarEventos();
  }, []);

  const getStatusClass = (statusType) => {
    if (statusType === "prevista") return "status-prevista";
    if (statusType === "incorreta") return "status-incorreta";
    return "";
  };

  return (
    <div className="widget-card tabela-widget-container">
      <h3>Detalhamento de Eventos</h3>
      {isLoading ? (
        <div>Carregando tabela...</div>
      ) : (
        <table className="tabela-eventos">
          <thead>
            <tr>
              <th>LOCALIZAÇÃO</th>
              <th>CATEGORIA</th>
              <th>DATA</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td>{evento.local}</td>
                <td>{evento.categoria}</td>
                <td>{evento.data}</td>
                <td>
                  <span
                    className={`status-chip ${getStatusClass(
                      evento.statusType
                    )}`}
                  >
                    {evento.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TabelaEventos;
