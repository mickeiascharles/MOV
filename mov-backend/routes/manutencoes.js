import { Router } from "express";
import {
  getTodasManutencoes,
  agendarManutencao,
} from "../controllers/manutencoesController.js";

const router = Router();

router.get("/", getTodasManutencoes);
router.post("/agendar", agendarManutencao);

export default router;
