import { Router } from "express";
import { getTareas, nuevaTarea, borrar, actualizarTexto, actualizarEstado } from "../controllers/tareasController.js";

const router = Router();

router.get("/", getTareas);
router.post("/nueva", nuevaTarea);
router.delete("/borrar/:id", borrar);
router.put("/actualizar/texto/:id", actualizarTexto);
router.put("/actualizar/estado/:id", actualizarEstado);

export default router;