import pool from "../db.js";

export const getTodasManutencoes = async (req, res) => {
  try {
    const query = `
      SELECT 
        m.id, m.data_agendada, m.horario_inicio, m.horario_fim, m.responsavel,
        b.codigo AS codigoBueiro 
      FROM manutencoes AS m
      JOIN bueiros AS b ON m.bueiro_id = b.id
      ORDER BY m.data_agendada DESC, m.horario_inicio DESC
    `;
    const [rows] = await pool.query(query);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro no servidor ao buscar manutenções." });
  }
};

export const agendarManutencao = async (req, res) => {
  const { codigoBueiro, dataAgendada, horarioInicio, horarioFim, responsavel } =
    req.body;

  if (
    !codigoBueiro ||
    !dataAgendada ||
    !horarioInicio ||
    !horarioFim ||
    !responsavel
  ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const [bueiroRows] = await pool.query(
      "SELECT id FROM bueiros WHERE codigo = ?",
      [codigoBueiro]
    );

    if (bueiroRows.length === 0) {
      return res
        .status(404)
        .json({ message: "Bueiro não encontrado com este código." });
    }
    const bueiroId = bueiroRows[0].id;

    const [result] = await pool.query(
      "INSERT INTO manutencoes (bueiro_id, data_agendada, horario_inicio, horario_fim, responsavel) VALUES (?, ?, ?, ?, ?)",
      [bueiroId, dataAgendada, horarioInicio, horarioFim, responsavel]
    );

    res.status(201).json({
      message: "Manutenção agendada com sucesso!",
      manutencaoId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro no servidor ao agendar manutenção." });
  }
};
