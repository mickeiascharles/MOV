import { describe, test, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js"; // Caminho Corrigido
import pool from "../db.js"; // Caminho Corrigido
import { clearDB } from "./testUtils.js"; // Importa a função de limpeza

describe("Testes de Caixa Branca: Gestão de Manutenções (CRUD)", () => {
  let bueiroIdTeste;
  const CODIGO_BUEIRO = "B-TESTE-99";

  beforeEach(async () => {
    await clearDB(); // Limpeza Mestra

    // Cria o bueiro de teste (necessário para a FK)
    const [result] = await pool.query(
      "INSERT INTO bueiros (codigo, latitude, longitude, status) VALUES (?, -15.0, -47.0, 'Ativo')",
      [CODIGO_BUEIRO]
    );
    bueiroIdTeste = result.insertId;
  });

  /*
   * Testes para POST /api/manutencoes/agendar
   */
  describe("POST /api/manutencoes/agendar", () => {
    test("deve retornar 201 e agendar uma manutenção com sucesso", async () => {
      const res = await request(app).post("/api/manutencoes/agendar").send({
        codigoBueiro: CODIGO_BUEIRO,
        dataAgendada: "2025-12-25",
        horarioInicio: "10:00",
        horarioFim: "12:00",
        responsavel: "Equipe Teste",
      });
      expect(res.statusCode).toBe(201);
    });

    test("deve retornar 404 se o codigoBueiro não existir", async () => {
      const res = await request(app).post("/api/manutencoes/agendar").send({
        codigoBueiro: "CODIGO-INEXISTENTE",
        dataAgendada: "2025-12-25",
        horarioInicio: "10:00",
        horarioFim: "12:00",
        responsavel: "Equipe Teste",
      });

      expect(res.statusCode).toBe(404);
    });
  });

  /*
   * Testes para GET /api/manutencoes
   */
  describe("GET /api/manutencoes", () => {
    test("deve retornar 200 e uma lista de manutenções com o nome do bueiro (JOIN)", async () => {
      // Cria a manutenção que será listada
      await pool.query(
        "INSERT INTO manutencoes (bueiro_id, data_agendada, horario_inicio, horario_fim, responsavel) VALUES (?, ?, ?, ?, ?)",
        [bueiroIdTeste, "2025-11-20", "08:00", "09:00", "Equipe Teste JOIN"]
      );

      const res = await request(app).get("/api/manutencoes");
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].codigoBueiro).toBe(CODIGO_BUEIRO);
    });
  });
});
