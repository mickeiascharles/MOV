import pool from "../db.js";
import bcrypt from "bcryptjs";

export const criarUsuario = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || !email || !senha || !role) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const [result] = await pool.query(
      "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)",
      [nome, email, senhaHash, role]
    );

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      userId: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ message: "Este email já está cadastrado." });
    }
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao criar usuário." });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const usuario = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }
    const { senha: _, ...dadosUsuario } = usuario;

    res.status(200).json({
      message: "Login bem-sucedido!",
      data: dadosUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao fazer login." });
  }
};

export const getTodosUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nome, email, role, contato FROM usuarios"
    );
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao buscar usuários." });
  }
};

export const excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor ao excluir usuário." });
  }
};
