import { Router } from "express";
import {
  getMeuPerfil,
  updateMeuPerfil,
  updateMinhaFoto,
} from "../controllers/perfilController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/:id", getMeuPerfil);
router.put("/:id", updateMeuPerfil);

router.put("/:id/foto", upload.single("foto"), updateMinhaFoto);

export default router;
