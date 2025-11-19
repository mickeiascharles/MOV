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

app.use(cors());
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
