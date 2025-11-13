import mysql from "mysql2/promise";

console.log("Conectando ao banco de dados MySQL...");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mov_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Conexão ao MySQL (mov_db) estabelecida com sucesso!");
    connection.release();
  })
  .catch((err) => {
    console.error("ERRO AO CONECTAR AO MYSQL:", err.message);
    if (err.code === "ECONNREFUSED") {
      console.error("ERRO: Verifique se o servidor MySQL (XAMPP) está ligado.");
    }
    if (err.code === "ER_BAD_DB_ERROR") {
      console.error(
        'ERRO: O banco de dados "mov_db" não foi encontrado. Você rodou o script SQL?'
      );
    }
  });

export default pool;
