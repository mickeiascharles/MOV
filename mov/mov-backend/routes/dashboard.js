import { Router } from "express";
import {
  getAlertas,
  getTabelaEventos,
  getHistoricoGrafico,
  getLocalizacoesGrafico,
} from "../controllers/dashboardController.js";

const router = Router();

// Define as rotas
router.get("/alertas", getAlertas);
router.get("/tabela-eventos", getTabelaEventos);
router.get("/historico-grafico", getHistoricoGrafico);
router.get("/localizacoes-grafico", getLocalizacoesGrafico);

export default router;
