import pool from "../db.js";

export async function clearDB() {
  console.log("\n--- Limpando DB para novo teste ---");
  try {
    // 1. DESATIVA a verificação de Foreign Keys (CRÍTICO!)
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");

    // 2. Limpa as tabelas de dados na ordem correta
    await pool.query("DELETE FROM manutencoes");
    await pool.query("DELETE FROM eventos");
    await pool.query("DELETE FROM bueiros");
    await pool.query("DELETE FROM usuarios");

    // 3. Reseta o auto-incremento
    await pool.query("ALTER TABLE usuarios AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE bueiros AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE manutencoes AUTO_INCREMENT = 1");

    // 4. ATIVA a verificação de Foreign Keys novamente
    await pool.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (error) {
    console.error("ERRO CRÍTICO NA LIMPEZA DO BANCO DE DADOS:", error.message);
    throw error;
  }
}
