import { Router } from "express";
import {
  getTodosBueiros,
  cadastrarBueiro,
  excluirBueiro,
} from "../controllers/bueirosController.js";

const router = Router();

router.get("/", getTodosBueiros);
router.post("/cadastrar", cadastrarBueiro);
router.delete("/:id", excluirBueiro);

export default router;
