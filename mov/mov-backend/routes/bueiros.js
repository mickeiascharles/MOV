import { Router } from "express";
import {
  getTodosBueiros,
  cadastrarBueiro,
} from "../controllers/bueirosController.js";

const router = Router();

router.get("/", getTodosBueiros);
router.post("/cadastrar", cadastrarBueiro);

export default router;
