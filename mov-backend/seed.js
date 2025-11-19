import pool from "./db.js";
import bcrypt from "bcryptjs";

async function criarUsuariosIniciais() {
  console.log('Iniciando script de "seed" de usuários iniciais...');

  const usuariosParaCriar = [
    {
      nome: "Admin Master",
      email: "admin@mov.com",
      senhaPura: "123",
      role: "Admin",
    },
    {
      nome: "Super Host",
      email: "superadmin@mov.com",
      senhaPura: "super123",
      role: "SuperAdmin",
    },
  ];

  try {
    for (const user of usuariosParaCriar) {
      const [existingUser] = await pool.query(
        "SELECT id FROM usuarios WHERE email = ?",
        [user.email]
      );

      if (existingUser.length > 0) {
        console.warn(
          `Aviso: Usuário "${user.email}" já existe. Pulando criação.`
        );
        continue;
      }
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(user.senhaPura, salt);
      const [result] = await pool.query(
        "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)",
        [user.nome, user.email, senhaHash, user.role]
      );

      console.log(
        `Usuário ${user.role} (ID: ${result.insertId}) criado com sucesso!`
      );
      console.log(`Login: ${user.email}, Senha: ${user.senhaPura}`);
    }
  } catch (error) {
    console.error("Erro ao criar usuários iniciais:", error.message);
  } finally {
    await pool.end();
  }
}

criarUsuariosIniciais();
