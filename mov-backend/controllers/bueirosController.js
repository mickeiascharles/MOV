import pool from "../db.js";

export const getTodosBueiros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bueiros ORDER BY codigo");
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao buscar bueiros." });
  }
};

export const cadastrarBueiro = async (req, res) => {
  const { codigo, latitude, longitude } = req.body;

  if (!codigo || !latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO bueiros (codigo, latitude, longitude, status) VALUES (?, ?, ?, ?)",
      [codigo, parseFloat(latitude), parseFloat(longitude), "Ativo"]
    );

    res.status(201).json({
      message: "Bueiro cadastrado com sucesso!",
      bueiroId: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Este código de bueiro já está cadastrado." });
    }
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao cadastrar bueiro." });
  }
};

export const excluirBueiro = async (req, res) => {
  const { id } = req.params;

  try {
    const [bueiros] = await pool.query("SELECT id FROM bueiros WHERE id = ?", [
      id,
    ]);

    if (bueiros.length === 0) {
      return res.status(404).json({ message: "Bueiro não encontrado." });
    }

    await pool.query("DELETE FROM eventos WHERE bueiro_id = ?", [id]);

    await pool.query("DELETE FROM bueiros WHERE id = ?", [id]);

    res.status(200).json({ message: "Bueiro excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao excluir bueiro." });
  }
};
