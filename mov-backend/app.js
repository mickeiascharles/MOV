import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import rotasUsuarios from "./routes/usuarios.js";
import rotasBueiros from "./routes/bueiros.js";
import rotasManutencoes from "./routes/manutencoes.js";
import rotasPerfil from "./routes/perfil.js";
import rotasDashboard from "./routes/dashboard.js";

const app = express();

// --- CONFIGURAÇÃO EXPLÍCITA E ROBUSTA DO CORS ---
const allowedOrigins = [
  "https://mickeiascharles.github.io", // Seu Frontend (Origem)
  "https://mov-backend-ex6e.onrender.com", // Seu Backend (Self-Origin)
];

const corsOptions = {
  // Função que checa a origem dinamicamente
  origin: function (origin, callback) {
    // Permite requisições de origens permitidas OU requisições sem origem (como local/Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Retorna erro CORS se a origem não for permitida
      callback(new Error("CORS: Acesso negado pela origem " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // REMOVIDO: credentials: true para resolver o conflito CORS/Render
};

// Aplica a regra de CORS a todas as requisições
app.use(cors(corsOptions));

// OBRIGATÓRIO: Responde à requisição OPTIONS (Preflight)
app.options("*", cors(corsOptions));
// --- FIM DA CONFIGURAÇÃO CORS ---

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "Servidor MOV OK. Acesse a API em /api" });
});

app.use("/api/usuarios", rotasUsuarios);
app.use("/api/bueiros", rotasBueiros);
app.use("/api/manutencoes", rotasManutencoes);
app.use("/api/perfil", rotasPerfil);
app.use("/api/dashboard", rotasDashboard);

app.get("/api", (req, res) => {
  res.json({ message: "Servidor MOV Backend está no ar!" });
});

export default app;
