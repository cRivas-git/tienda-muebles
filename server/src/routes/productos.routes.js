import {Router} from 'express';
import {listar, obtenerPorId, crear} from "../controllers/productos.controller.js";

const router = Router();

router.get('/', listar);
router.get('/:id', obtenerPorId);
router.post('/', crear);

export default router;