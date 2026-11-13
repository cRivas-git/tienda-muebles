import * as AuthService from '../services/auth.service.js';

export async function login(req, res){
    const {correo, contrasena} = req.body ?? {};
    if(!correo || !contrasena){
        return res.status(400).json({ msg: 'Correo y contraseña son obligatorios'});
    }

    const token = await AuthService.login(correo, contrasena);
    if(!token) return res.status(401).json({ msg: 'Credenciales inválidas' });

    res.json({ msg: 'Login exitoso', token})

}
