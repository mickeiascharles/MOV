import pool from "../db.js";

export const getAlertas = async (req, res) => {
  try {
    await seedEventosSeVazio();
    const query = `
      SELECT e.id, e.tipo, b.codigo AS codigoBueiro, DATE_FORMAT(e.timestamp, '%H:%i') AS horario
      FROM eventos AS e
      JOIN bueiros AS b ON e.bueiro_id = b.id
      ORDER BY e.timestamp DESC
      LIMIT 2
    `;
    const [rows] = await pool.query(query);

    const alertas = rows.map((row) => ({
      ...row,
      titulo:
        row.tipo === "NaoAutorizada"
          ? "Abertura não autorizada"
          : "Abertura autorizada",
      tipo: row.tipo === "NaoAutorizada" ? "nao_autorizada" : "autorizada",
    }));

    res.status(200).json({ data: alertas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao buscar alertas." });
  }
};

export const getTabelaEventos = async (req, res) => {
  try {
    await seedEventosSeVazio();
    const query = `
      SELECT 
        e.id, 
        b.codigo AS local, 
        IF(e.tipo = 'NaoAutorizada', 'Violação', 'Manutenção agendada') AS categoria,
        DATE_FORMAT(e.timestamp, '%d/%m/%Y às %H:%i') AS data,
        IF(e.tipo = 'NaoAutorizada', 'Abertura Incorreta', 'Abertura Prevista') AS status,
        IF(e.tipo = 'NaoAutorizada', 'incorreta', 'prevista') AS statusType
      FROM eventos AS e
      JOIN bueiros AS b ON e.bueiro_id = b.id
      ORDER BY e.timestamp DESC
      LIMIT 10
    `;
    const [rows] = await pool.query(query);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro no servidor ao buscar tabela de eventos." });
  }
};

export const getAllEventos = async (req, res) => {
  try {
    await seedEventosSeVazio();
    const query = `
      SELECT 
        e.id, 
        b.codigo AS local, 
        b.latitude,
        b.longitude,
        IF(e.tipo = 'NaoAutorizada', 'Violação', 'Manutenção agendada') AS categoria,
        DATE_FORMAT(e.timestamp, '%Y-%m-%d %H:%i:%s') AS dataFormatada,
        DATE_FORMAT(e.timestamp, '%d/%m/%Y %H:%i:%s') AS data,
        e.timestamp AS timestampRaw,
        IF(e.tipo = 'NaoAutorizada', 'Abertura Incorreta', 'Abertura Prevista') AS status,
        IF(e.tipo = 'NaoAutorizada', 'incorreta', 'prevista') AS statusType,
        e.tipo AS tipo,
        CASE 
          WHEN e.tipo = 'NaoAutorizada' THEN 
            CASE 
              WHEN TIMESTAMPDIFF(HOUR, e.timestamp, NOW()) <= 1 THEN 'Alta'
              WHEN TIMESTAMPDIFF(HOUR, e.timestamp, NOW()) <= 24 THEN 'Média'
              ELSE 'Baixa'
            END
          ELSE 'Baixa'
        END AS prioridade,
        CASE 
          WHEN e.tipo = 'NaoAutorizada' AND TIMESTAMPDIFF(HOUR, e.timestamp, NOW()) <= 24 THEN 'Aberto'
          WHEN e.tipo = 'NaoAutorizada' AND TIMESTAMPDIFF(HOUR, e.timestamp, NOW()) > 24 AND TIMESTAMPDIFF(HOUR, e.timestamp, NOW()) <= 48 THEN 'Em Atendimento'
          ELSE 'Fechado'
        END AS statusAtendimento,
        CASE 
          WHEN e.tipo = 'NaoAutorizada' THEN 'Abertura não autorizada detectada'
          ELSE 'Manutenção agendada realizada'
        END AS descricao
      FROM eventos AS e
      JOIN bueiros AS b ON e.bueiro_id = b.id
      ORDER BY e.timestamp DESC
    `;
    const [rows] = await pool.query(query);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao buscar eventos." });
  }
};

export const getHistoricoGrafico = async (req, res) => {
  try {
    await seedEventosSeVazio();

    const query = `
      SELECT
        MONTH(timestamp) AS mes,
        SUM(CASE WHEN tipo = 'Autorizada' THEN 1 ELSE 0 END) AS autorizados,
        SUM(CASE WHEN tipo = 'NaoAutorizada' THEN 1 ELSE 0 END) AS nao_autorizados
      FROM eventos
      WHERE YEAR(timestamp) = YEAR(CURDATE())
      GROUP BY MONTH(timestamp)
      ORDER BY mes ASC
    `;
    const [rows] = await pool.query(query);

    const labels = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const autorizadosData = new Array(12).fill(0);
    const naoAutorizadosData = new Array(12).fill(0);

    rows.forEach((row) => {
      autorizadosData[row.mes - 1] = Number(row.autorizados);
      naoAutorizadosData[row.mes - 1] = Number(row.nao_autorizados);
    });

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Eventos Autorizados",
          data: autorizadosData,
          backgroundColor: "#FF7F00",
        },
        {
          label: "Eventos Não Autorizados",
          data: naoAutorizadosData,
          backgroundColor: "#D32F2F",
        },
      ],
    };

    res.status(200).json({ data: chartData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro no servidor ao buscar dados do gráfico." });
  }
};

export const getLocalizacoesGrafico = async (req, res) => {
  try {
    await seedEventosSeVazio();

    const query = `
      SELECT 
        b.codigo,
        COUNT(e.id) AS contagem
      FROM eventos AS e
      JOIN bueiros AS b ON e.bueiro_id = b.id
      GROUP BY e.bueiro_id, b.codigo
      ORDER BY contagem DESC
      LIMIT 5
    `;
    const [rows] = await pool.query(query);

    const labels = rows.map((row) => row.codigo);
    const data = rows.map((row) => row.contagem);

    const backgroundColor = data.map((count, index) => {
      return index === 0 ? "#D32F2F" : "#E0E0E0";
    });

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Eventos",
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    };

    res.status(200).json({ data: chartData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro no servidor ao buscar dados do gráfico." });
  }
};

async function seedEventosSeVazio() {
  const [bueiros] = await pool.query("SELECT id FROM bueiros");
  if (bueiros.length === 0) {
    console.warn('SEED: Nenhum bueiro encontrado. Pule o "seed" de eventos.');
    return;
  }

  const [eventos] = await pool.query("SELECT id FROM eventos LIMIT 1");
  if (eventos.length > 0) {
    return;
  }

  console.log(
    'SEED: Tabela "eventos" está vazia. Populando com dados falsos...'
  );
  try {
    const bueiroId = bueiros[0].id;
    await pool.query(
      `INSERT INTO eventos (bueiro_id, tipo, timestamp) VALUES
        (?, 'NaoAutorizada', NOW() - INTERVAL 1 HOUR),
        (?, 'Autorizada', NOW() - INTERVAL 2 DAY),
        (?, 'NaoAutorizada', NOW() - INTERVAL 3 DAY),
        (?, 'NaoAutorizada', NOW() - INTERVAL 1 MONTH),
        (?, 'Autorizada', NOW() - INTERVAL 2 MONTH),
        (?, 'NaoAutorizada', NOW() - INTERVAL 2 MONTH),
        (?, 'Autorizada', NOW() - INTERVAL 5 MONTH)
      `,
      [bueiroId, bueiroId, bueiroId, bueiroId, bueiroId, bueiroId, bueiroId]
    );
  } catch (error) {
    console.error('Erro no "seed" de eventos:', error.message);
  }
}
