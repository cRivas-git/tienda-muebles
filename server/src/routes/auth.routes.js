import { Router } from 'express';
import {login, logout} from '../controllers/auth.controller.js'
import {verificarToken} from "../middlewares/auth.middleware.js";


const router = Router();

router.post('/login', login)
router.post('/logout', logout)
router.get('/me', verificarToken, (req, res) => res.json(req.usuario));

export default router;