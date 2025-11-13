import { Router } from "express";
import {
  login,
  criarUsuario,
  getTodosUsuarios,
  excluirUsuario,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/criar", criarUsuario);
router.get("/", getTodosUsuarios);
router.delete("/:id", excluirUsuario);

export default router;
