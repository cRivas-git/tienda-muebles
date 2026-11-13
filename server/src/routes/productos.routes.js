import {Router} from 'express';
import {listar, obtenerPorId, crear, cambiarEstadoPorId, eliminarPorId} from "../controllers/productos.controller.js";
import {protegerSiNoEsActivo, verificarToken} from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/',protegerSiNoEsActivo, listar);
router.get('/:id', obtenerPorId);
router.post('/', verificarToken, crear);
router.patch('/:id',verificarToken, cambiarEstadoPorId)
router.delete('/:id', verificarToken, eliminarPorId)

export default router;