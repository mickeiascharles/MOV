import pool from "../db.js";

export const getMeuPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id, nome, email, role, contato, foto_url FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao buscar perfil." });
  }
};

export const updateMeuPerfil = async (req, res) => {
  const { id } = req.params;
  const { nome, email, contato } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios." });
  }

  try {
    await pool.query(
      "UPDATE usuarios SET nome = ?, email = ?, contato = ? WHERE id = ?",
      [nome, email, contato || null, id]
    );

    const [rows] = await pool.query(
      "SELECT id, nome, email, role, contato, foto_url FROM usuarios WHERE id = ?",
      [id]
    );

    res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      data: rows[0],
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Este email já está em uso por outra conta." });
    }
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao atualizar perfil." });
  }
};

export const updateMinhaFoto = async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Nenhum arquivo de imagem enviado." });
  }

  try {
    const fotoPath = req.file.path.replace(/\\/g, "/");
    const fotoUrl = `http://localhost:3001/${fotoPath}`;

    await pool.query("UPDATE usuarios SET foto_url = ? WHERE id = ?", [
      fotoUrl,
      id,
    ]);

    const [rows] = await pool.query(
      "SELECT id, nome, email, role, contato, foto_url FROM usuarios WHERE id = ?",
      [id]
    );

    res.status(200).json({
      message: "Foto atualizada com sucesso!",
      data: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao salvar a foto." });
  }
};
