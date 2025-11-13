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
    // Insere no MySQL
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
