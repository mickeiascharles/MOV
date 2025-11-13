import pool from "./db.js";

export async function clearDB() {
  try {
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");

    await pool.query("TRUNCATE TABLE manutencoes");
    await pool.query("TRUNCATE TABLE eventos");
    await pool.query("TRUNCATE TABLE bueiros");
    await pool.query("TRUNCATE TABLE usuarios");

    await pool.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (error) {
    console.error("ERRO CRÍTICO NA LIMPEZA DO BANCO DE DADOS:", error.message);
  }
}

beforeEach(async () => {
  await clearDB();
});

afterAll(async () => {
  console.log("\n--- Fechando Conexão do MySQL ---");
  await pool.end();
});
