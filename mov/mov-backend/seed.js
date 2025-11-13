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
    }, // <-- NOVO USUÁRIO
  ];

  try {
    for (const user of usuariosParaCriar) {
      // Verifica se o usuário já existe para evitar erro
      const [existingUser] = await pool.query(
        "SELECT id FROM usuarios WHERE email = ?",
        [user.email]
      );

      if (existingUser.length > 0) {
        console.warn(
          `⚠️ Aviso: Usuário "${user.email}" já existe. Pulando criação.`
        );
        continue;
      }

      // 1. Criptografa a senha
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(user.senhaPura, salt);

      // 2. Insere no banco
      const [result] = await pool.query(
        "INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)",
        [user.nome, user.email, senhaHash, user.role]
      );

      console.log(
        `✅ Usuário ${user.role} (ID: ${result.insertId}) criado com sucesso!`
      );
      console.log(`   Login: ${user.email}, Senha: ${user.senhaPura}`);
    }
  } catch (error) {
    console.error("❌ Erro ao criar usuários iniciais:", error.message);
  } finally {
    // 3. Fecha a conexão
    await pool.end();
  }
}

// Roda a função
criarUsuariosIniciais();
