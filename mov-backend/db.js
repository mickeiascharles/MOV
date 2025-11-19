import mysql from "mysql2/promise";
import "dotenv/config";

console.log("Conectando ao banco de dados MySQL...");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl:
    process.env.DB_HOST !== "localhost"
      ? { rejectUnauthorized: false }
      : undefined,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Conexão ao MySQL estabelecida com sucesso!");
    connection.release();
  })
  .catch((err) => {
    console.error("ERRO AO CONECTAR AO MYSQL:", err.message);
  });

export default pool;
