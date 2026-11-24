import {Router} from 'express';
import {
    listar,
    obtenerPorId,
    crear,
    cambiarEstadoPorId,
    eliminarPorId,
    actualizarPorId
} from "../controllers/productos.controller.js";
import {protegerSiNoEsActivo, verificarToken} from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/',protegerSiNoEsActivo, listar);
router.get('/:id', protegerSiNoEsActivo, obtenerPorId);
router.post('/', verificarToken, crear);
router.put('/:id', verificarToken, actualizarPorId);
router.patch('/:id',verificarToken, cambiarEstadoPorId)
router.delete('/:id', verificarToken, eliminarPorId)

export default router;