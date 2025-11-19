import { Router } from "express";
import {
  getAlertas,
  getTabelaEventos,
  getHistoricoGrafico,
  getLocalizacoesGrafico,
  getAllEventos,
} from "../controllers/dashboardController.js";

const router = Router();

router.get("/alertas", getAlertas);
router.get("/tabela-eventos", getTabelaEventos);
router.get("/eventos", getAllEventos);
router.get("/historico-grafico", getHistoricoGrafico);
router.get("/localizacoes-grafico", getLocalizacoesGrafico);

export default router;
