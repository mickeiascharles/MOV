import { describe, test, expect, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import pool from "../db.js";
import bcrypt from "bcryptjs";
// REMOVEMOS: import { clearDB } from './testUtils.js';

describe("Testes de Caixa Branca: Auth (Login e Usuários)", () => {
  // O beforeEach foi MOVIDO para vitest.setup.js
  beforeEach(async () => {
    // Re-cria o usuário Admin (SEED)
    const senhaHash = await bcrypt.hash("123", 10);
    await pool.query(
      "INSERT INTO usuarios (nome, email, senha, role) VALUES ('Admin Master', 'admin@mov.com', ?, 'Admin')",
      [senhaHash]
    );
  });

  // ... (o restante dos testes fica IGUAL) ...

  describe("POST /api/usuarios/login", () => {});
  describe("POST /api/usuarios/criar", () => {});
});
