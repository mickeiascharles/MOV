import { describe, test, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js"; // Caminho Corrigido
import pool from "../db.js"; // Caminho Corrigido
import { clearDB } from "./testUtils.js"; // Importa a função de limpeza

describe("Testes de Caixa Branca: Gestão de Bueiros (CRUD)", () => {
  // A LIMPEZA MESTRA:
  beforeEach(async () => {
    await clearDB();
  });

  /*
   * Testes para POST /api/bueiros/cadastrar
   */
  describe("POST /api/bueiros/cadastrar", () => {
    test("deve retornar 400 se o código estiver faltando", async () => {
      const res = await request(app)
        .post("/api/bueiros/cadastrar")
        .send({ latitude: -15.123, longitude: -47.123 });
      expect(res.statusCode).toBe(400);
    });
    test("deve retornar 201 e criar um bueiro com sucesso", async () => {
      const res = await request(app)
        .post("/api/bueiros/cadastrar")
        .send({
          codigo: "Poço Teste-101",
          latitude: -15.123,
          longitude: -47.123,
        });
      expect(res.statusCode).toBe(201);
    });
    test("deve retornar 409 (Conflito) ao tentar criar um código duplicado", async () => {
      await request(app)
        .post("/api/bueiros/cadastrar")
        .send({
          codigo: "Poço Duplicado",
          latitude: -15.123,
          longitude: -47.123,
        });
      const res = await request(app)
        .post("/api/bueiros/cadastrar")
        .send({ codigo: "Poço Duplicado", latitude: -10.0, longitude: -40.0 });
      expect(res.statusCode).toBe(409);
    });
  });

  /*
   * Testes para GET /api/bueiros
   */
  describe("GET /api/bueiros", () => {
    test("deve retornar 200 e uma lista de bueiros", async () => {
      await pool.query(
        "INSERT INTO bueiros (codigo, latitude, longitude, status) VALUES ('B-01', -15.1, -47.1, 'Ativo')"
      );
      await pool.query(
        "INSERT INTO bueiros (codigo, latitude, longitude, status) VALUES ('B-02', -15.2, -47.2, 'Inativo')"
      );
      const res = await request(app).get("/api/bueiros");
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBe(2);
    });
  });
});
